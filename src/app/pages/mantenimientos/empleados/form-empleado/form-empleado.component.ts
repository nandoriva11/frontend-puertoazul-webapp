import { Component } from '@angular/core';
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

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrl: './form-empleado.component.css'
})
export class FormEmpleadoComponent {
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
    // private _location: Location,
    private _aR: ActivatedRoute
  ) {
    this.titulo = "REGISTRO DE NUEVO EMPLEADO"
    this.createForm();
    this.getCargos();
    this.getDistritos();
    this.getTipoDocumentos();
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
      telefono: [null, [Validators.required, Validators.minLength(9), Validators.pattern('^[0-9,$]*$')]],
      distrito: [{ value: null, disabled: true }, [Validators.required]],
      cargo: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
    })
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

  }

}
