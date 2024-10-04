import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Bebida } from '../../../../../models/bebida';
import { TipoBebida } from '../../../../../models/tipo-bebida';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../../services/modal.service';
import { BebidasService } from '../../../../../services/bebidas.service';
import { Router } from '@angular/router';
import { TipoBebidaService } from '../../../../../services/tipo-bebida.service';
import { FormsService } from '../../../../../services/forms.service';
import { Estado } from '../../../../../enums/estado';
import Swal from 'sweetalert2';
import { url_backend2 } from '../../../../../../assets/environments/environment';

@Component({
  selector: 'app-form-bebidas',
  templateUrl: './form-bebidas.component.html',
  styleUrl: './form-bebidas.component.css'
})
export class FormBebidasComponent implements OnInit, OnChanges {
  private imgSelect!: File;
  public formSubmited = false;
  public cargando = false;
  public imgSrc: any;
  public noImagen = url_backend2 + 'bebidas/uploads/img/noimg';
  bebida!: Bebida;
  tipo_bebida_select: TipoBebida[] = [];
  formBebida!: FormGroup;
  @Output("messageEvent") messageEvent = new EventEmitter();
  @Output("cerrarFormEvent") cerrarFormEvent = new EventEmitter();
  @Input() item: number = 0;

  constructor(
    public _mS: ModalService,
    private _bS: BebidasService,
    public _fs: FormsService,
    private form: FormBuilder,
    private router: Router,
    private _tBebidaS: TipoBebidaService) {
    this.crearFormulario();
    this.listarTipos();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item > 0) {
      this.cargando = true;
      this._bS.getEntity(this.item).subscribe(
        res => {
          setTimeout(() => {
            this.cargando = false;
            this.bebida = res.objeto;
            this.mapFormBebida();
          }, 1000);
        }
      )
    }
  }
  ngOnInit(): void {
    console.log("Iniciando Form Bebidas");
  }


  public cerrarModal() {
    this.crearFormulario();
    this._mS.cerrarModal();
    this.item = 0;
    this.imgSrc = null;
    this.cerrarFormEvent.emit(this.item);
  }

  mapFormBebida() {
    this.formBebida.get('nombre')?.setValue(this.bebida.nombre);
    this.formBebida.get('tipo_bebida')?.setValue(this.bebida.tipo_bebida);
    this.formBebida.get('precio')?.setValue(this.bebida.precio);
    if (this.bebida.imagen) {
      this.imgSrc = url_backend2 + "bebidas/uploads/img/" + this.bebida.imagen;
    } else {
      this.imgSrc = null;
    }
  }

  crearFormulario() {
    this.formBebida = this.form.group({
      nombre: [null, [Validators.required]],
      tipo_bebida: [null, [Validators.required]],
      precio: [null, [Validators.required, Validators.min(1)]],
    })

    this.formSubmited = false;
  }

  submit() {
    this.formSubmited = true;
    if (this.formBebida.valid) {
      this.mapearTipoPlato();
      this.registrarPlato();

    }
  }
  abrirSubModal() {
    this._mS.abrirModal_2();
  }

  sendMessage() {
    this.messageEvent.emit("MENSAJE DESDE EL HIJO");
  }

  mapearTipoPlato() {
    this.bebida = new Bebida(); {
      this.bebida.nombre = this.formBebida.get('nombre')?.value;
      this.bebida.tipo_bebida = this.formBebida.get('tipo_bebida')?.value;
      this.bebida.precio = this.formBebida.get('precio')?.value;
      this.bebida.estado = Estado.ACTIVO;

    }
  }

  seleccionarImagen(event: any) {
    this.imgSelect = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imgSrc = reader.result;
    reader.readAsDataURL(this.imgSelect);
  }

  registrarPlato() {
    this.cargando = true;
    if (this.item == 0 || this.item == null) {
      if (this.imgSelect == null) {
        console.log("GUARDANDO SIN FOTO");

        this._bS.create(this.bebida).subscribe(
          res => {
            setTimeout(() => {
              this.cargando = false;
              this.cerrarModal();
              this.alerta("Bebida creada correctamente.");
              this.messageEvent.emit(null);
              this.crearFormulario();

            }, 1000);
          },
          err => {
            this.cargando = false;
            console.log(err);
          }
        )
      } else {
        console.log("GUARDANDO CON FOTO");
        this._bS.crearConFoto(this.bebida, this.imgSelect).subscribe(
          res => {
            setTimeout(() => {
              this.cargando = false;
              this.cerrarModal();
              this.alerta("Bebida creada correctamente.");
              this.messageEvent.emit(null);
              this.crearFormulario();
            }, 1000);
          },
          err => {
            this.cargando = false;
            console.log(err);
          })
      }
    } else {
      console.log("EDITANDO CON FOTO O SIN FOTO");
      this._bS.editarConFoto(this.bebida, this.imgSelect, this.item).subscribe(
        res => {
          setTimeout(() => {
            this.cargando = false;
            this.cerrarModal();
            this.alerta("Bebida modificada correctamente.");
            this.messageEvent.emit(this.item);
            this.crearFormulario();

          }, 1000)
        }, err => {
          this.cargando = false;
          console.log(err);

        }
      )
    }


  }

  alerta(mensaje: String) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: mensaje
    });
  }

  listarTipos() {
    this._tBebidaS.listar().subscribe(
      r => {
        this.tipo_bebida_select = r;
      }
    )
  }

  receiveMessage(event: any) {
    this.listarTipos();
  }

  compareTipo(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
