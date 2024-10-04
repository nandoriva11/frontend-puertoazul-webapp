import { Component, OnInit } from '@angular/core';
import { Distrito } from '../../../../models/distrito';
import { Cargo } from '../../../../models/cargo';
import { TipoDocumento } from '../../../../models/tipo-documento';
import { Empleado } from '../../../../models/empleado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../../services/empleado.service';
import { DistritoService } from '../../../../services/distrito.service';
import { FormsService } from '../../../../services/forms.service';
import { ActivatedRoute } from '@angular/router';
import { TipoDocumentoService } from '../../../../services/tipo-documento.service';
import { CargoService } from '../../../../services/cargo.service';
import { MyValidation } from '../../../../validators/my-validation';
import { DatePipe, Location } from '@angular/common';

import Swal from 'sweetalert2';
import { Estado } from '../../../../enums/estado';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrl: './form-empleado.component.css'
})
export class FormEmpleadoComponent implements OnInit {
  public titulo: String;
  public distritos: Distrito[] = [];
  public cargos: Cargo[] = [];
  public tipo_documento: TipoDocumento[] = [];
  public formSubmited = false;
  public inputDNI = false;
  public spinnerDNI = false;
  public empleado!: Empleado;
  public formEmpleado!: FormGroup;

  constructor(
    private _eS: EmpleadoService,
    private _dS: DistritoService,
    private _tdS: TipoDocumentoService,
    private _cargoS: CargoService,
    private _formB: FormBuilder,
    public _formS: FormsService,
    private datePipe: DatePipe,
    // private _location: Location,
    private _aR: ActivatedRoute,
    private location: Location
  ) {
    this.titulo = "REGISTRO DE NUEVO EMPLEADO"
    this.createForm();
    this.getCargos();
    this.getDistritos();
    this.getTipoDocumentos();
  }
  ngOnInit(): void {
    this.getEmpleadoServer();
  }

  getEmpleadoServer() {
    this._aR.params.subscribe(
      params => {
        let id = params['id'];

        if (id && id > 0) {
          console.log(id);

          this._eS.getEntity(id).subscribe(
            res => {
              console.log(id);
              this.empleado = new Empleado();
              this.empleado = res.objeto;
              console.log(this.empleado);
              this.mapForm();
            },
            err => {
              this.location.back();
            }
          )
        }

      }
    )
  }

  createForm() {
    this.formEmpleado = this._formB.group({
      nombres: [null, [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      apellidos: [null, [Validators.required, Validators.pattern('[a-zA-Z ]{2,254}')]],
      tipo_documento: [null, [Validators.required]],
      num_doc: [{ value: null, disabled: true }, [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
      estado_civil: [null, [Validators.required]],
      genero: [null, [Validators.required]],
      fecha_nac: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], MyValidation.existsEmail(this._eS)],
      direccion: [null, [Validators.required]],
      celular: [null, [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9,$]*$')]],
      distrito: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      descripcion: [null],
    })
  }


  mapForm() {
    this.titulo = "Modificar Empleado";
    if (this.empleado.id) {
      this.formEmpleado.get('nombres')?.setValue(this.empleado.nombres);
      this.formEmpleado.get('apellidos')?.setValue(this.empleado.apellidos);
      this.formEmpleado.get('tipo_documento')?.setValue(this.empleado.tipo_documento);
      this.formEmpleado.get('tipo_documento')?.disable();
      this.formEmpleado.get('num_doc')?.setValue(this.empleado.num_doc);
      this.formEmpleado.get('genero')?.setValue(this.empleado.genero);
      this.formEmpleado.get('estado_civil')?.setValue(this.empleado.estado_civil);
      this.formEmpleado.get('fecha_nac')?.setValue(this.empleado.fecha_nac);
      this.formEmpleado.get('celular')?.setValue(this.empleado.celular);
      this.formEmpleado.get('email')?.setValue(this.empleado.email);
      this.formEmpleado.get('email')?.disable();
      this.formEmpleado.get('departamento')?.setValue(this.empleado.distrito);
      this.formEmpleado.get('direccion')?.setValue(this.empleado.direccion);
      this.formEmpleado.get('cargo')?.setValue(this.empleado.cargo);
      this.formEmpleado.get('cargo')?.disable();
      this.formEmpleado.get('distrito')?.setValue(this.empleado.distrito);
      console.log(this.formEmpleado.valid);

    }
  }


  mapEmpleado() {
    this.empleado = this.formEmpleado.value;
    this.empleado.estado = Estado.ACTIVO;
    console.log(this.empleado);
  }

  save() {
    
    Swal.fire({
      title: '¿Desea registrar NUEVO EMPLEADO?',
      text: "Verifique los datos, recuerda que los campos DNI, E-MAIL no se podrán modificar después.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Verificar'
    }).then((result) => {
      if (result.isConfirmed) {

        this._eS.create(this.empleado).subscribe(
          res => {
            console.log(res);
            Swal.fire('Listo', 'Empleado creado correctamente, informe al nuevo empleado de sus datos para acceder al sistema.', 'success');
            this.location.back();
          },
          err => {
            Swal.fire('Error', 'Parece que ocurrio un error interno, intenedelo de nuevo.', 'error');
            console.log(err);
            window.location.reload();
          }
        )
      }
    });
  }
  getDistritos() {
    this._dS.listar().subscribe(
      res => {
        this.distritos = res;
      }
    )
  }

  getCargos() {
    this._cargoS.listar().subscribe(
      res => {
        this.cargos = res;
      }
    )
  }

  getTipoDocumentos() {
    this._tdS.listar().subscribe(
      res => {
        this.tipo_documento = res;
      }
    )
  }

  compareTipo(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  activeNumDoc() {
    if (this.formEmpleado.get('tipo_documento')?.value) {
      this.formEmpleado.get('num_doc')?.enable();
    } else {
      this.formEmpleado.get('num_doc')?.disable();
      this.formEmpleado.get('num_doc')?.setValue(null);
    }
  }

  existsUniqueCampDNI(value: any) {
    if (this.formEmpleado.get('num_doc')?.valid) {
      this.spinnerDNI = true;
      setTimeout(() => {
        this._eS.verifyDNI(value.target.value).subscribe(
          res => {
            const existe = res.existe;
            if (existe) {
              this.spinnerDNI = false;
              this.formSubmited = true;
              this.formEmpleado.get('num_doc')?.setErrors({ 'duplicate': true });

            } else {
              this.spinnerDNI = false;
            }
          }
        )
      }, 1000)
    }
  }


  submit() {
    this.formSubmited = true;
    console.log(this.formEmpleado);
    console.log(this.formEmpleado.valid);
    if (this.formEmpleado.valid) {
      if (this.empleado && this.empleado.id) {
        console.log("update");
        this.updateEmpleado();
      } else {
        this.empleado = new Empleado();
        this.mapEmpleado();
        console.log(this.empleado);
        this.save();
      }
    }
  }

  updateEmpleado() {
    if (this.empleado.id) {
      let id = this.empleado.id;
      let email = this.empleado.email;
      let tipo_doc = this.empleado.tipo_documento;
      let dni = this.empleado.num_doc;
      let cargo = this.empleado.cargo;
      this.mapEmpleado();
      this.empleado.id = id;
      this.empleado.email = email;
      this.empleado.tipo_documento = tipo_doc;
      this.empleado.num_doc = dni;
      this.empleado.cargo = cargo;
      this._eS.editarConFoto(this.empleado, null, this.empleado.id).subscribe(
        res => {
          console.log(res);
          Swal.fire('Listo', 'Empleado Actualizado Correctamente', 'success');
          this.location.back();
        },
        err => {
          console.log(err);
        }
      )
    }
  }

}
