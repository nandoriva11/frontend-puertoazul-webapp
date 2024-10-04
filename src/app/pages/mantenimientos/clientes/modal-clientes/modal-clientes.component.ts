import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Cliente } from '../../../../models/cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { ClientesService } from '../../../../services/clientes.service';
import { FormsService } from '../../../../services/forms.service';
import Swal from 'sweetalert2';
import { ReniecServiceService } from '../../../../services/reniec-service.service';
import { LoginComponent } from '../../../../auth/login/login.component';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrl: './modal-clientes.component.css'
})
export class ModalClientesComponent implements OnChanges, OnInit {
  public formSubmited = false;
  public cargando = false;

  cliente!: Cliente;
  formCliente!: FormGroup;
  @Output("messageEvent") messageEvent = new EventEmitter();
  @Output("cerrarFormEvent") cerrarFormEvent = new EventEmitter();
  @Input() item: number = 0;

  constructor(
    public _mS: ModalService,
    private _cS: ClientesService,
    public _fs: FormsService,
    private form: FormBuilder,
    private _reniecS: ReniecServiceService) {
    this.crearFormulario();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item > 0) {
      this.cargando = true;
      this._cS.getEntity(this.item).subscribe(
        res => {
          setTimeout(() => {
            this.cargando = false;
            this.cliente = res.objeto;
            this.mapFormBebida();
          }, 1000);
        }
      )
    }
  }
  ngOnInit(): void {
    console.log("Iniciando Form Clientes");
  }


  public cerrarModal() {
    this.crearFormulario();
    this._mS.cerrarModal();
    this.item = 0;
    this.cerrarFormEvent.emit(this.item);
  }

  mapFormBebida() {
    this.formCliente.get('nombres')?.setValue(this.cliente.nombres);
    this.formCliente.get('apellidos')?.setValue(this.cliente.apellidos);
    this.formCliente.get('dni')?.setValue(this.cliente.num_doc);
    this.formCliente.get('celular')?.setValue(this.cliente.celular);

  }
  buscarCliente() {
    let dni = this.formCliente.get('dni')?.value as string;
    if (dni && dni.length == 8) {
      this._reniecS.getPersonaFromReniecByDNI(dni).subscribe(
        {
          next: (res) => {
            console.log(res);
            let reniecEntity = res;
            this.formCliente.get('nombres')?.setValue(reniecEntity.nombres);
            this.formCliente.get('dni')?.setValue(reniecEntity.numeroDocumento);
            this.formCliente.get('apellidos')?.setValue(reniecEntity.apellidoPaterno + " " + reniecEntity.apellidoMaterno);
   
          },
          error: (error) => {

          }
        }
      )
    } else {
      Swal.fire({
        title: "Mensaje:",
        text: "Ingrese un DNI valido.",
        icon: "warning",
        target: document.getElementById('modal-lg')
      });
    }
  }



  crearFormulario() {
    this.formCliente = this.form.group({
      nombres: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      dni: [null, [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
      celular: [null,]
    })
    this.formSubmited = false;
  }

  submit() {
    this.formSubmited = true;
    if (this.formCliente.valid) {
      this.mapCliente();
      this.registrar();
    }
  }
  abrirSubModal() {
    this._mS.abrirModal_2();
  }

  mapCliente(){
    console.log(this.formCliente.value);
    this.cliente = new Cliente();
    this.cliente.nombres = this.formCliente.get("nombres")?.value;
    this.cliente.apellidos = this.formCliente.get("apellidos")?.value;
    this.cliente.num_doc = this.formCliente.get("dni")?.value;
    this.cliente.celular = this.formCliente.get("celular")?.value;
  }



  registrar() {
    this.cargando = true;

    if (this.item == 0 || this.item == null) {
      
      this._cS.create(this.cliente).subscribe(
        {
          "next": (res) => {
            setTimeout(() => {
              this.cargando = false;
              this.cerrarModal();
              this.alerta("Cliente creado correctamente.");
              this.messageEvent.emit(null);
              this.crearFormulario();
            }, 1000);
          },
          "error": (err) => {
            this.cargando = false;
            console.log(err);
          }
        }
      )

    } else {
      this.cliente.id = this.item
      this._cS.create(this.cliente).subscribe(
        {
          "next": (res) => {
            setTimeout(() => {
              this.cargando = false;
              this.cerrarModal();
              this.alerta("Cliente actualizado correctamente.");
              this.messageEvent.emit(null);
              this.crearFormulario();
            }, 1000);
          },
          "error": (err) => {
            this.cargando = false;
            console.log(err);
          }
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


  receiveMessage(event: any) {

  }

  compareTipo(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

}
