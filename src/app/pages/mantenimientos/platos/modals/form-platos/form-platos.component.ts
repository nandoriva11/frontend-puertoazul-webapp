import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalService } from '../../../../../services/modal.service';
import { PlatoService } from '../../../../../services/plato.service';
import { FormsService } from '../../../../../services/forms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Plato } from '../../../../../models/plato';
import { CategoriaPlatoService } from '../../../../../services/categoria-plato.service';
import { CategoriaPlato } from '../../../../../models/categoria-plato';
import { Estado } from '../../../../../enums/estado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-platos',
  templateUrl: './form-platos.component.html',
  styleUrl: './form-platos.component.css'
})
export class FormPlatosComponent implements OnInit, OnChanges {
  private imgSelec!: File;
  public formSubmited = false;
  public cargando = false;
  public imgSrc: any;
  plato!: Plato;
  categoriaPlatoSelect: CategoriaPlato[] = [];
  formPlato!: FormGroup;
  @Output("messageEvent") messageEvent = new EventEmitter();
  @Output("cerrarFormEvent") cerrarFormEvent = new EventEmitter();
  @Input() item: number = 0;

  constructor(
    public modalSer: ModalService,
    private platoSer: PlatoService,
    public _fs: FormsService,
    private form: FormBuilder,
    private router: Router,
    private catePlatoSer: CategoriaPlatoService) {
    this.crearFormulario();
    this.listarCategorias();
  }
  ngOnChanges(changes: SimpleChanges): void {
   
    
    if (this.item > 0) {
      this.cargando = true;
      this.platoSer.getEntity(this.item).subscribe(
        res => {
          setTimeout(() => {
            this.cargando = false;
            this.plato = res.objeto;
            this.mapFormPlato();

          }, 1000);
        }
      )
    }
  }

  public cerrarModal() {
    this.crearFormulario();
    this.modalSer.cerrarModal();
    this.item = 0;
    this.imgSrc = null;
    this.cerrarFormEvent.emit(this.item);
  }

  ngOnInit(): void {
    console.log("iniciando");
    
  }



  mapFormPlato() {
    this.formPlato.get('nombre')?.setValue(this.plato.nombre);
    this.formPlato.get('categoria')?.setValue(this.plato.categoriaPlato);
    this.formPlato.get('precio')?.setValue(this.plato.precio);
    if (this.plato.imagen) {
      this.imgSrc = "http://localhost:9078/cevicheria/api/platos/uploads/img/" + this.plato.imagen;
    }else{
      this.imgSrc = null;
    }
  }

  crearFormulario() {
    this.formPlato = this.form.group({
      nombre: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      precio: [null, [Validators.required, Validators.min(1)]],
    })
    this.formSubmited = false;
  }

  submit() {
    this.formSubmited = true;
    if (this.formPlato.valid) {
      this.mapearTipoPlato();
      this.registrarPlato();

    }
  }
  abrirSubModal() {
    this.modalSer.abrirModal_2();
  }



  mapearTipoPlato() {
    this.plato = new Plato(); {
      this.plato.nombre = this.formPlato.get('nombre')?.value;
      this.plato.categoriaPlato = this.formPlato.get('categoria')?.value;
      this.plato.precio = this.formPlato.get('precio')?.value;
      this.plato.estado = Estado.ACTIVO;

    }
  }

  seleccionarImagen(event: any) {
    this.imgSelec = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imgSrc = reader.result;
    reader.readAsDataURL(this.imgSelec);
  }

  registrarPlato() {
    this.cargando = true;
    if (this.item == 0 || this.item == null) {
      if (this.imgSelec == null) {
        console.log("sinfoto");

        this.platoSer.create(this.plato).subscribe(
          res => {
            setTimeout(() => {
              this.cargando = false;
              this.cerrarModal();
              this.alerta();
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
        this.platoSer.crearConFoto(this.plato, this.imgSelec).subscribe(
          res => {
            setTimeout(() => {
              this.cargando = false;
              this.cerrarModal();
              this.alerta();
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
      this.platoSer.editarConFoto(this.plato, this.imgSelec, this.item).subscribe(
        res => {
          setTimeout(() => {
            this.cargando = false;
            this.cerrarModal();
            this.alerta();
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

  alerta() {
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
      title: "Plato registrado correctamente."
    });
  }

  listarCategorias() {
    this.catePlatoSer.listar().subscribe(
      r => {
        this.categoriaPlatoSelect = r;

      }
    )
  }

  receiveMessage(event: any) {
    this.listarCategorias();
  }

  compareTipo(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }


}
