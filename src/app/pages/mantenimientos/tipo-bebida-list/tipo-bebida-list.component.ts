import { Component } from '@angular/core';
import { TipoBebida } from '../../../models/tipo-bebida';
import { TipoBebidaService } from '../../../services/tipo-bebida.service';
import { ModalService } from '../../../services/modal.service';
declare var $: any;

@Component({
  selector: 'app-tipo-bebida-list',
  templateUrl: './tipo-bebida-list.component.html',
  styleUrl: './tipo-bebida-list.component.css'
})
export class TipoBebidaListComponent {
  public table!: any;
  public cargando: boolean = false;
  public tipo_bebidas: TipoBebida[] = [];
  public idSelect!: number;


  constructor(private _tBebidaS: TipoBebidaService, private _mS: ModalService) {

  }
  ngOnDestroy(): void {
    this.tipo_bebidas = [];
    this.cargando = false;
    this.deleteTable();
  }
  ngOnInit(): void {
    this.listarTipos();
  }

  listarTipos() {
    this._tBebidaS.listar().subscribe(
      res => {
        this.tipo_bebidas = [];
        this.deleteTable();
        this.cargando = true;
        setTimeout(() => {
          this.tipo_bebidas = res;
          this.cargando = false;
          this.createDataTable();
        }, 1000)
      }
    )
  }

  abrirForm() {
    this._mS.abrirModal_2();
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
    this.listarTipos();
    this.idSelect = 0;
  }

  cerrarFormEvent(event: any) {
    console.log("cerrando");
    this.idSelect = 0;
    console.log(this.idSelect);

  }

  setId(id: number) {
    this.idSelect = id;
    console.log("el id es " + this.idSelect);
    this.abrirForm();
  }

  receiveMessage($event: any) {
    this.deleteTable();
    this.listarTipos();


  }
}
