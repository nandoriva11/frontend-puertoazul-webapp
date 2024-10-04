import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { Plato } from '../../../models/plato';
import { Estado } from '../../../enums/estado';
import { PlatoService } from '../../../services/plato.service';
declare var jQuery: any;
declare var $: any;
import { ModalService } from '../../../services/modal.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrl: './platos.component.css'
})
export class PlatosComponent implements OnInit, OnDestroy {
  public table!: any;
  public cargando: boolean = false;
  public platos: Plato[] = [];
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  public idSelect!: number;


  constructor(private platoSer: PlatoService, private modalSer: ModalService) {

  }
  ngOnDestroy(): void {
    this.deleteTable();
    $('#example1').dataTable().fnDestroy();
    $('#example1').dataTable().fnDestroy();
    $('#example1').dataTable().fnDestroy();
    this.platos = [];
    this.cargando = false;
    console.log("destruyendo");
    
  }
  ngOnInit(): void {
    this.listarTipos(this.activo);
  }

  listarTipos(estado: Estado) {
    this.platoSer.getByStatus(estado).subscribe(
      res => {
        this.platos = [];
        this.deleteTable();
        this.cargando = true;
        setTimeout(() => {
          this.platos = res;
          this.cargando = false;
          this.createDataTable();
        }, 1000)
      }
    )
  }

 

  abrirForm() {
    this.modalSer.abrirModal();
  }

  listar() {
    this.platoSer.listar().subscribe(res => {
      this.platos = [];
      this.deleteTable()
      this.cargando = true;
      setTimeout(() => {
        this.platos = res;
        console.log(this.platos);

        this.cargando = false;
      }, 100);
    })
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

  updateList(event: any) {
    this.deleteTable();
    this.listar();
    this.idSelect = 0;
  }

  cerrarFormEvent(event: any) {
    console.log("cerrando");
    this.idSelect = 0;
    console.log(this.idSelect);
    

  }

  updateStatus(esp: Plato, boolean: boolean) {
    if (boolean) {


      this.platoSer.changeStatus(esp, Estado.ACTIVO).subscribe(
        res => {
          window.location.reload();
        }
      )
    } else {
      this.platoSer.changeStatus(esp, Estado.INACTIVO).subscribe(
        res => {
          window.location.reload();
        }
      )
    }
  }


  setId(id: number) {
    this.idSelect = id;
    console.log("el id es " + this.idSelect);

    this.abrirForm();
  }

  receiveMessage($event: any) {
    this.deleteTable();
    this.listarTipos(this.activo);
  }

}
