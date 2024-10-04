import { Component, OnInit } from '@angular/core';
import { Estado } from '../../../enums/estado';
import { Pago } from '../../../models/pago';
import { PagoService } from '../../../services/pago.service';
declare var $: any;

@Component({
  selector: 'app-pagos-pendientes',
  templateUrl: './pagos-pendientes.component.html',
  styleUrl: './pagos-pendientes.component.css'
})
export class PagosPendientesComponent implements OnInit {
  public table!: any;
  public cargando: boolean = false;
  public pagos: Pago[] = [];
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  public idSelect!: number;


  constructor(private _pS: PagoService) {
    this.listarTipos(Estado.PENDIENTE);
  }
  ngOnDestroy(): void {
    this.pagos = [];
    this.cargando = false;
    this.deleteTable();
  }
  ngOnInit(): void {

  }


  listarTipos(estado: Estado) {
    this._pS.getByStatus(estado).subscribe(
      res => {
        this.deleteTable();
        this.pagos = [];
        this.cargando = true;
        setTimeout(() => {
          this.pagos = res;
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
