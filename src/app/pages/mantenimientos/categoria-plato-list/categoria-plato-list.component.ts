import { Component } from '@angular/core';
import { CategoriaPlatoService } from '../../../services/categoria-plato.service';
import { ModalService } from '../../../services/modal.service';
import { CategoriaPlato } from '../../../models/categoria-plato';
import { Estado } from '../../../enums/estado';
declare var $: any;

@Component({
  selector: 'app-categoria-plato-list',
  templateUrl: './categoria-plato-list.component.html',
  styleUrl: './categoria-plato-list.component.css'
})
export class CategoriaPlatoListComponent {
  public table!: any;
  public cargando: boolean = false;
  public categoria: CategoriaPlato[] = [];
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  public idSelect!: number;


  constructor(private _cS: CategoriaPlatoService, private _mS: ModalService) {

  }
  ngOnDestroy(): void {
    this.categoria = [];
    this.cargando = false;
    this.deleteTable();
  }
  ngOnInit(): void {
    this.listarTipos();
  }

  listarTipos() {
    this._cS.listar().subscribe(
      res => {
        this.categoria = [];
        this.deleteTable();
        this.cargando = true;
        setTimeout(() => {
          this.categoria = res;
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
      $("#example2").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#example2_wrapper .col-md-6:eq(0)');


    });

  }

  deleteTable() {
    $('#example2').dataTable().fnDestroy();
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
