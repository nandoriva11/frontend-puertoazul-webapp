import { Component } from '@angular/core';
import { Pedido } from '../../../models/pedido';
import { Estado } from '../../../enums/estado';
import { Empleado } from '../../../models/empleado';
import { PedidosService } from '../../../services/pedidos.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrl: './lista-pedidos.component.css'
})
export class ListaPedidosComponent {
  public table!: any;
  public cargando: boolean = false;
  public pedidos: Pedido[] = [];
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  public idSelect!: number;


  constructor(private _pS: PedidosService) {
    this.listarTipos(Estado.PENDIENTE);
  }
  ngOnDestroy(): void {
    this.pedidos = [];
    this.cargando = false;
    this.deleteTable();
  }
  ngOnInit(): void {
    
  }


  listarTipos(estado: Estado) {
    this._pS.getByStatus(estado).subscribe(
      res => {
        this.deleteTable();
        this.pedidos = [];
        this.cargando = true;
        setTimeout(() => {
          this.pedidos = res;
          this.cargando = false;
          this.createDataTable();
        }, 1000)
      }
    )
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
