import { Component } from '@angular/core';
import { ReniecServiceService } from '../../../services/reniec-service.service';
import { ClientesService } from '../../../services/clientes.service';
import { Cliente } from '../../../models/cliente';
import Swal from 'sweetalert2';
import { ModalService } from '../../../services/modal.service';
declare var $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  cargando = false;
  public idSelect!: number;

  constructor(
    private _reniecS: ReniecServiceService,
    private _clienteS: ClientesService,
    private _modalS: ModalService
  ) {
    this.listarClientes();
  }

  listarClientes() {
    this._clienteS.listar().subscribe(
      res => {
        this.clientes = [];
        this.deleteTable();
        this.cargando = true;
        setTimeout(() => {
          this.clientes = res;
          this.cargando = false;
          this.createDataTable();
        }, 1000)
      }
    )
  }

  abrirModal(){
    this._modalS.abrirModal();
  }

  cerrarFormEvent(event: any) {
    console.log("cerrando");
    this.idSelect = 0;
  }

  receiveMessage($event: any) {
    this.deleteTable();
    this.listarClientes();
  }



  getCliente() {
  
  }

  setId(id: number) {
    this.idSelect = id;
    this._modalS.abrirModal();
  }

  createDataTable() {

    $(function () {
      $("#example1").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    });

  }

  deleteTable() {
    $('#example1').dataTable().fnDestroy();
  }
}
