import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bebida } from '../../../models/bebida';
import { Estado } from '../../../enums/estado';
import { BebidasService } from '../../../services/bebidas.service';
import { ModalService } from '../../../services/modal.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrl: './bebidas.component.css'
})
export class BebidasComponent implements OnDestroy, OnInit {
  public cargando: boolean = false;
  public bebidas: Bebida[] = [];
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  public _idBebidaSelec!: number;

  constructor(private _bS: BebidasService, private _mS: ModalService) {

  }
  ngOnInit(): void {
    this.listarTipos(this.activo);
  }
  ngOnDestroy(): void {
    this.bebidas = [];
    this.cargando = false;
    this.deleteTable();
  }
  listar() {
    this._bS.listar().subscribe(res => {
      this.bebidas = [];
      this.deleteTable()
      this.cargando = true;
      setTimeout(() => {
        this.bebidas = res;
        this.cargando = false;
      }, 100);
    })
  }


  listarTipos(estado: Estado) {
    this._bS.getByStatus(estado).subscribe(
      res => {
        this.bebidas = [];
        this.deleteTable();
        this.cargando = true;
        setTimeout(() => {
          this.bebidas = res;
          this.cargando = false;
          this.createDataTable();
        }, 1000)
      }
    )
  }

  abrirForm() {
    this._mS.abrirModal();
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
    this._idBebidaSelec = 0;
  }

  cerrarFormEvent(event: any) {
    console.log("cerrando");
    this._idBebidaSelec = 0;


  }

  updateStatus(esp: Bebida, boolean: boolean) {
    if (boolean) {
      this._bS.changeStatus(esp, Estado.ACTIVO).subscribe(
        res => {
          window.location.reload();
        }
      )
    } else {
      this._bS.changeStatus(esp, Estado.INACTIVO).subscribe(
        res => {
          window.location.reload();
        }
      )
    }
  }


  setId(id: number) {
    this._idBebidaSelec = id;
    this.abrirForm();
  }

  receiveMessage($event: any) {
    this.deleteTable();
    this.listarTipos(this.activo);
  }



}
