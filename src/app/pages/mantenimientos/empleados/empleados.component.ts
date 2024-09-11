import { Component } from '@angular/core';
import { Empleado } from '../../../models/empleado';
import { Estado } from '../../../enums/estado';
import { EmpleadoService } from '../../../services/empleado.service';
import { ModalService } from '../../../services/modal.service';
declare var $: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {
  public table!: any;
  public cargando: boolean = false;
  public empleados: Empleado[] = [];
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  public idSelect!: number;


  constructor(private _eS: EmpleadoService, private _mS: ModalService) {

  }
  ngOnDestroy(): void {
    this.empleados = [];
    this.cargando = false;
    this.deleteTable();
  }
  ngOnInit(): void {
    this.listarTipos(this.activo);
  }

  listarTipos(estado: Estado) {
    this._eS.getByStatus(estado).subscribe(
      res => {
        this.empleados = [];
        this.deleteTable();
        this.cargando = true;
        setTimeout(() => {
          this.empleados = res;
          this.cargando = false;
          this.createDataTable();
        }, 1000)
      }
    )
  }


  listar() {
    this._eS.listar().subscribe(res => {
      this.empleados = [];
      this.deleteTable()
      this.cargando = true;
      setTimeout(() => {
        this.empleados = res;
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
    });

  }

  deleteTable() {
    $('#example1').dataTable().fnDestroy();
  }

  updateStatus(empleado: Empleado, boolean: boolean) {
    if (boolean) {
      this._eS.changeStatus(empleado, Estado.ACTIVO).subscribe(
        res => {
          window.location.reload();
        }
      )
    } else {
      this._eS.changeStatus(empleado, Estado.INACTIVO).subscribe(
        res => {
          window.location.reload();
        }
      )
    }
  }
}
