import { Injectable } from '@angular/core';
import { PedidoLista } from '../models/pedido-lista';
import { Plato } from '../models/plato';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DetallePedidoPlato } from '../models/detalle-pedido-plato';
import { DeferBlockDepsEmitMode } from '@angular/compiler';
import { DetallePedidoBebida } from '../models/detalle-pedido-bebida';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoListaService {

  public _detalles!: PedidoLista;

  constructor() {
    this.detalles
  }

  public get detalles(): PedidoLista {


    if (this._detalles != null) {
      return this._detalles;
    } else {
      return this._detalles = new PedidoLista();
    }

  }

  setDetalles(pedido: Pedido) {
    
    pedido.pedidoDetallesPlatos.forEach(
      p => {
        this.detalles.detallePlatos.set(p.plato.id, p);
      }
    )

    pedido.pedidoDetallesBebidas.forEach(
      p => {
        this.detalles.detalleBebidas.set(p.bebida.id, p);
      }
    )
  }
  public restart() {
    this._detalles = new PedidoLista();
  }

  public getDetallePlato(id: number): DetallePedidoPlato | null | undefined {
    return this.detalles.detallePlatos.get(id);
  }


  public addPlatoDetalle(detallePlato: DetallePedidoPlato, cantidad: number) {

    if (this.detalles.detallePlatos.get(detallePlato.plato.id)) {
      let cantidad = this.detalles.detallePlatos.get(detallePlato.plato.id)?.cantidad as number;
      detallePlato.cantidad = cantidad + detallePlato.cantidad;
      detallePlato.sub_total = detallePlato.cantidad * detallePlato.plato.precio;

      this._detalles.detallePlatos.set(detallePlato.plato.id, detallePlato);
    } else {
      this.detalles.detallePlatos.set(detallePlato.plato.id, detallePlato);
    }

  }
  public getListaDetallesPlatos(): DetallePedidoPlato[] {
    return Array.from(this.detalles.detallePlatos.values());
  }

  public updateDetallesPlatos(detalles: DetallePedidoPlato) {
    this.detalles.detallePlatos.set(detalles.plato.id, detalles);
  }



  public eliminarDetallePlato(key: number): void {
    this.detalles.detallePlatos.delete(key);
  }

  public updatePlatoDetalleCantidad(detallePlato: DetallePedidoPlato, cantidad: number) {
    let dpbd = this.getDetallePlato(detallePlato.plato.id);
    if (dpbd) {
      dpbd.cantidad = cantidad;
      if (cantidad > 9) {
        dpbd.cantidad = 9;
      } else if (cantidad < 1) {
        dpbd.cantidad = 1;
      } else {
        dpbd.sub_total = dpbd.cantidad * dpbd.plato.precio;
        this.detalles.detallePlatos.set(detallePlato.plato.id, dpbd);
      }
    }
  }

  public getCantidadDetallePlato(id: number): number {
    let dpbd = this.getDetallePlato(id);
    if (dpbd) {
      return dpbd.cantidad;
    } else {
      return 0;
    }
  }

  public deleteCantidadDetallePlato(id: number) {
    this.detalles.detallePlatos.delete(id);
  }



  public getDetailBebida(id: number): DetallePedidoBebida | null | undefined {
    return this.detalles.detalleBebidas.get(id);
  }


  public addBebidaDetalle(detalleBebida: DetallePedidoBebida, cantidad: number) {

    if (this.detalles.detallePlatos.get(detalleBebida.bebida.id)) {
      let cantidad = this.detalles.detallePlatos.get(detalleBebida.bebida.id)?.cantidad as number;
      detalleBebida.cantidad = cantidad + detalleBebida.cantidad;
      detalleBebida.subtotal = detalleBebida.cantidad * detalleBebida.bebida.precio;

      this._detalles.detalleBebidas.set(detalleBebida.bebida.id, detalleBebida);
    } else {
      this.detalles.detalleBebidas.set(detalleBebida.bebida.id, detalleBebida);
    }

  }
  public getListaDetallesBebidas(): DetallePedidoBebida[] {
    return Array.from(this.detalles.detalleBebidas.values());
  }

  public updateDetallesBebidas(detalles: DetallePedidoBebida) {
    this.detalles.detalleBebidas.set(detalles.bebida.id, detalles);
  }



  public updateBebidaDetalleCantidad(detalleBebida: DetallePedidoBebida, cantidad: number) {
    let dpbd = this.getDetailBebida(detalleBebida.bebida.id);
    if (dpbd) {
      dpbd.cantidad = cantidad;
      if (cantidad > 9) {
        dpbd.cantidad = 9;
      } else if (cantidad < 1) {
        dpbd.cantidad = 1;
      } else {
        dpbd.subtotal = dpbd.cantidad * dpbd.bebida.precio;
        this.detalles.detalleBebidas.set(detalleBebida.bebida.id, dpbd);
      }
    }
  }

  public getCantidadDetalleBebida(id: number): number {
    let dpbd = this.getDetailBebida(id);
    if (dpbd) {
      return dpbd.cantidad;
    } else {
      return 0;
    }
  }

  public deleteCantidadDetalleBebida(id: number) {
    this.detalles.detalleBebidas.delete(id);
  }



}
