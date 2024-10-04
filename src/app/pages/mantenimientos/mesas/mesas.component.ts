import { Component } from '@angular/core';
import { Mesa } from '../../../models/mesa';
import { Estado } from '../../../enums/estado';
import { ModalService } from '../../../services/modal.service';
import { MesasService } from '../../../services/mesas.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {
  public table!: any;
  public cargando: boolean = true;
  public mesas: Mesa[] = [];
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  public idSelect!: number;

  constructor(private mesaService: MesasService, private modalSer: ModalService) {
    this.listar();
  }
  ngOnDestroy(): void {
    this.mesas = [];
    this.cargando = false;
    this.deleteTable();
  }


  abrirForm() {
    this.modalSer.abrirModal();
  }

  listar() {
    this.mesaService.listar().subscribe(res => {
      console.log(res);
      
      this.mesas = [];
   /*    this.deleteTable(); */
      this.cargando = true;
      setTimeout(() => {
        this.mesas = res;
        this.cargando = false;
     /*    this.createDataTable(); */
      }, 1000)
    })
  }
  
  setId(mesa: number) {
    this.idSelect = mesa;
  }
  createDataTable() {

    $(function () {
      $("#example1").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }

  deleteTable() {
    $('#example1').dataTable().fnDestroy();
  }
}

