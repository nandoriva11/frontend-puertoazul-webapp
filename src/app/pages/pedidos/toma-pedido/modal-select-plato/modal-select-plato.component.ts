import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { PlatoService } from '../../../../services/plato.service';
import { CategoriaPlatoService } from '../../../../services/categoria-plato.service';
import { CategoriaPlato } from '../../../../models/categoria-plato';
import { Plato } from '../../../../models/plato';
import { TipoBebida } from '../../../../models/tipo-bebida';
import { TipoBebidaService } from '../../../../services/tipo-bebida.service';
import { BebidasService } from '../../../../services/bebidas.service';
import { Bebida } from '../../../../models/bebida';
import Swal from 'sweetalert2';
import { retry, timeout } from 'rxjs';
import { r3JitTypeSourceSpan } from '@angular/compiler';
import { PedidoListaService } from '../../../../services/pedido-lista.service';

@Component({
  selector: 'app-modal-select-plato',
  templateUrl: './modal-select-plato.component.html',
  styleUrl: './modal-select-plato.component.css'
})
export class ModalSelectPlatoComponent implements OnChanges {
  public cargando_platos = false;
  public categorias: CategoriaPlato[] = [];
  public bebidas: Bebida[] = [];
  public platos: Plato[] = [];
  public mostrar_tabla_platos = false;
  public mostrar_tabla_bebidas = false;
  @Input("idCategoria") idCategoria: number = 0;
  @Input("idTipoBebida") idTipoBebida: number = 0;
  @Output("cerrarFormEvent") cerrarFormEvent = new EventEmitter();
  @Output("eventEnviarPlato") eventEnviarPlato = new EventEmitter();
  @Output("eventEnviarBebida") eventEnviarBebida = new EventEmitter();


  constructor(
    public _mS: ModalService,
    private _pS: PlatoService,
    private _cPlatoService: CategoriaPlatoService,
    private _tbS: TipoBebidaService,
    private _bS: BebidasService,
    private _plS: PedidoListaService) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.platos = [];
    this.bebidas = [];

    if (this.idCategoria > 0) {
      this.mostrar_tabla_platos = true;
      this.mostrar_tabla_bebidas = false;
      this.listarXCategoria(this.idCategoria);
    }

    if (this.idTipoBebida > 0) {
      this.mostrar_tabla_bebidas = true;
      this.mostrar_tabla_platos = false;
      this.listarPorTipo(this.idTipoBebida);
    }


  }


  listarXCategoria(id: number) {
    this._pS.getByCategoria(id).subscribe(
      res => {
        this.cargando_platos = true;
        setTimeout(() => {
          this.platos = res;
          this.cargando_platos = false;
        }, 500)
      }
    )
  }

  enviarPlato(plato: Plato) {
    let cantidad!: number;
    let detalles: string = "";
    //let object = { "plato": plato, "cantidad": cantidad }
    Swal.fire({
      title: "Selecciono plato:\n " + plato.nombre + "\nIngrese Cantidad:",
      input: "number",
      inputLabel: "Ingrese cantidad",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      target: document.getElementById('sweet-event'),
      inputValidator: (v) => {
        return new Promise((resolve) => {
          if (+v) {
            resolve();
          } else {
            resolve("Ingrese una cantidad valida")
          }
        })
      }
    }).then((result) => {
      if (result.isConfirmed) {
        cantidad = +result.value;
        if (this._plS.detalles.detallePlatos.get(plato.id)) {
          detalles = this._plS.detalles.detallePlatos.get(plato.id)?.detalles || "";
        }
        Swal.fire({
          title: "¿Desea añadir algún detalle al plato?",
          input: "textarea",
          inputValue: detalles,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Enviar Detalle",
          denyButtonText: "Sin detalle",
          cancelButtonText: "Cancelar",
          target: document.getElementById('sweet-event'),
        }).then((result) => {
          if (result.isConfirmed) {

            setTimeout(() => {
              detalles = result.value;
              let object = { "plato": plato, "cantidad": cantidad, "detalles": detalles }
              this.eventEnviarPlato.emit(object);
              this.cerrarModal();
            }, 200)
          } else if (result.isDenied) {
            setTimeout(() => {
              let object = { "plato": plato, "cantidad": cantidad, "detalles": null }
              this.eventEnviarPlato.emit(object);
              this.cerrarModal();
            }, 200)
          }
        });
      }
    });
  }


  enviarBebida(bebida: Bebida) {
    let cantidad!: number;
    let detalles: string = "";
    //let object = { "plato": plato, "cantidad": cantidad }
    Swal.fire({
      title: "Selecciono bebida:\n " + bebida.nombre + "\nIngrese Cantidad:",
      input: "number",
      inputLabel: "Ingrese cantidad",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Enviar",
      cancelButtonText: "Cancelar",
      target: document.getElementById('sweet-event'),
      inputValidator: (v) => {
        return new Promise((resolve) => {
          if (+v) {
            resolve();
          } else {
            resolve("Ingrese una cantidad valida")
          }
        })
      }
    }).then((result) => {
      if (result.isConfirmed) {
        cantidad = +result.value;
        if (this._plS.detalles.detalleBebidas.get(bebida.id)) {
          detalles = this._plS.detalles.detalleBebidas.get(bebida.id)?.detalles || "";
        }
        Swal.fire({
          title: "¿Desea añadir algún detalle a la bebida?",
          input: "textarea",
          inputValue: detalles,
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Enviar Detalle",
          denyButtonText: "Sin detalle",
          cancelButtonText: "Cancelar",
          target: document.getElementById('sweet-event'),
        }).then((result) => {
          if (result.isConfirmed) {

            setTimeout(() => {
              detalles = result.value;
              let object = { "bebida": bebida, "cantidad": cantidad, "detalles": detalles }
              this.eventEnviarBebida.emit(object);
              this.cerrarModal();
            }, 200)
          } else if (result.isDenied) {
            setTimeout(() => {
              let object = { "bebida": bebida, "cantidad": cantidad, "detalles": null }
              this.eventEnviarBebida.emit(object);
              this.cerrarModal();
            }, 200)
          }
        });
      }
    });
  }


  listarPorTipo(id: number) {
    this._bS.getByTipo(id).subscribe(
      res => {
        this.cargando_platos = true;
        setTimeout(() => {
          this.bebidas = res;
          this.cargando_platos = false;
        }, 500)
      }
    )
  }




  cerrarModal() {
    this._mS.cerrarModal();
    this.cerrarFormEvent.emit(null);
    this.bebidas = [];
    this.platos = [];
  }
}
