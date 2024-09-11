import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { CategoriaPlato } from '../../../../models/categoria-plato';
import { ModalService } from '../../../../services/modal.service';
import { CategoriaPlatoService } from '../../../../services/categoria-plato.service';
import { FormsService } from '../../../../services/forms.service';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styleUrl: './form-categoria.component.css'
})
export class FormCategoriaComponent implements OnChanges {
  public formSubmited = false;
  public cargando = false;
  categoria!: CategoriaPlato;
  formCategoria!: FormGroup;
  @Output("eventoListarSelect") messageEvent = new EventEmitter();
  @Output("cerrarFormEvent") cerrarFormEvent = new EventEmitter();
  @Input() item: number = 0;
  constructor(

    public modalSer: ModalService,
    private _cS: CategoriaPlatoService,
    public _fs: FormsService,
    private form: FormBuilder,
    private router: Router,
  ) {
    this.crearFormulario();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.item > 0) {
      this.cargando = true;
      this._cS.getEntity(this.item).subscribe(
        res => {
          setTimeout(() => {
            this.cargando = false;
            this.categoria = res.objeto;
            this.mapForm();
          }, 1000);
        }
      )
    }
  }

  mapForm() {
    this.formCategoria.get('nombre')?.setValue(this.categoria.nombre);

  }

  public cerrarModal() {
    this.crearFormulario();
    this.modalSer.cerrarModal_2();
    this.item = 0;
    this.cerrarFormEvent.emit(this.item);

  }

  crearFormulario() {
    this.formSubmited = false;
    this.formCategoria = this.form.group({
      nombre: [null, [Validators.required]]
    })
  }

  submit() {
    this.formSubmited = true;
    if (this.formCategoria.valid) {
      this.mapearCategoria();
      this.registrarCategoria();
    }
  }
  mapearCategoria() {
    this.categoria = new CategoriaPlato();
    this.categoria.nombre = this.formCategoria.get('nombre')?.value;
  }

  registrarCategoria() {
    this.cargando = true;
    let mensaje = "Categoría registrada correctamente";
    if (this.item > 0) {
      this.categoria.id = this.item;
      mensaje = "Categoría modificada correctamente"
    }

    this._cS.create(this.categoria).subscribe(
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
    /*     const Toast = Swal.mixin({
          toast: true,
          position: "top-start",
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
          title: "Categoría registrada correctamente.",
          target: document.getElementById('modal-lg')
        }); */

  }

}
