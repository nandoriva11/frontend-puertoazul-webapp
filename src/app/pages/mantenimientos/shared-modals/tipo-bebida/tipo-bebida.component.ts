import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoBebida } from '../../../../models/tipo-bebida';
import { ModalService } from '../../../../services/modal.service';
import { TipoBebidaService } from '../../../../services/tipo-bebida.service';
import { FormsService } from '../../../../services/forms.service';

@Component({
  selector: 'app-tipo-bebida',
  templateUrl: './tipo-bebida.component.html',
  styleUrl: './tipo-bebida.component.css'
})
export class TipoBebidaComponent implements OnChanges {
  public formSubmited = false;
  public cargando = false;
  tipo_bebida!: TipoBebida;
  formTipoBebida!: FormGroup;
  @Output("eventoListarSelect") messageEvent = new EventEmitter();
  @Output("cerrarFormEvent") cerrarFormEvent = new EventEmitter();
  @Input() item: number = 0;

  constructor(

    public _ms: ModalService,
    private _tBebidaS: TipoBebidaService,
    public _fs: FormsService,
    private form: FormBuilder,
    private router: Router,
  ) {
    this.crearFormulario();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.item > 0) {
      this.cargando = true;
      this._tBebidaS.getEntity(this.item).subscribe(
        res => {
          setTimeout(() => {
            this.cargando = false;
            this.tipo_bebida = res.objeto;
            this.mapForm();
          }, 1000);
        }
      )
    }
  }

  mapForm() {
    this.formTipoBebida.get('nombre')?.setValue(this.tipo_bebida.nombre);

  }

  public cerrarModal() {
    this.crearFormulario();
    this._ms.cerrarModal_2();
    this.item = 0;
    this.cerrarFormEvent.emit(this.item);
  }

  crearFormulario() {
    this.formSubmited = false;
    this.formTipoBebida = this.form.group({
      nombre: [null, [Validators.required]]
    })
  }

  submit() {
    this.formSubmited = true;
    if (this.formTipoBebida.valid) {
      this.mapearCategoria();
      this.registrarCategoria();
    }
  }
  mapearCategoria() {
    this.tipo_bebida = new TipoBebida();
    this.tipo_bebida.nombre = this.formTipoBebida.get('nombre')?.value;
  }

  registrarCategoria() {

    this.cargando = true;
    let mensaje = "Tipo Bebida Registrada Correctamente";
    if (this.item > 0) {
      this.tipo_bebida.id = this.item;
      mensaje = "Categoría modificada correctamente";
    }
    this._tBebidaS.create(this.tipo_bebida).subscribe(
      res => {
        setTimeout(() => {
          this.cargando = false;
          this.messageEvent.emit(null);
          this.alerta(mensaje);
          this.crearFormulario();
          this.cerrarModal();
        }, 1000)
      },
      err => {
        this.cargando = false;
        console.log(err);
      }
    )
  }



  alerta(mensaje: String) {
    Swal.fire({
      icon: "success",
      title: "HECHO",
      text: "" + mensaje,
      target: document.getElementById('modal-lg')
    });
  }
}
