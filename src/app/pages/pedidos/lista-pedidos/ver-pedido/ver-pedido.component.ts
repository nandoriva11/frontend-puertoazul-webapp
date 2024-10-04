import { Component } from '@angular/core';
import { PedidosService } from '../../../../services/pedidos.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Pedido } from '../../../../models/pedido';
import { DetallePedidoPlato } from '../../../../models/detalle-pedido-plato';
import { DetallePedidoBebida } from '../../../../models/detalle-pedido-bebida';
import { PedidosDetalleBebidasService } from '../../../../services/pedidos-detalle-bebidas.service';
import { PedidosDetallePlatosService } from '../../../../services/pedidos-detalle-platos.service';
import { Estado } from '../../../../enums/estado';
import { ImpresionService } from '../../../../services/impresion.service';
import { PagoService } from '../../../../services/pago.service';
import Swal from 'sweetalert2';
import { Pago } from '../../../../models/pago';
import { AuthService } from '../../../../services/auth.service';
import { Empleado } from '../../../../models/empleado';
import { TipoPago } from '../../../../models/tipo-pago';
import { TipoRecibo } from '../../../../models/tipo-recibo';

@Component({
  selector: 'app-ver-pedido',
  templateUrl: './ver-pedido.component.html',
  styleUrl: './ver-pedido.component.css'
})
export class VerPedidoComponent {
  public pedidoBD!: Pedido;

  constructor(
    private pSer: PedidosService,
    private _aR: ActivatedRoute,
    private router: Router,
    private _dBS: PedidosDetalleBebidasService,
    private _dPS: PedidosDetallePlatosService,
    private impresionService: ImpresionService,
    private pagoService: PagoService,
    private authService: AuthService
  ) {
    this.getPedido();
  }

  getPedido() {
    this._aR.params.subscribe(
      {
        "next": (params) => {
          let id = params['id'];
          if (id) {
            this.pSer.getEntity(id).subscribe({
              "next": (res) => {
                this.pedidoBD = res.objeto
              },
              "error": (err) => {
                this.router.navigateByUrl("dashboard")

              }
            })
          } else {
            this.router.navigateByUrl("dashboard")
          }
        }
      }
    )
  }



  actualizarPlato(p: DetallePedidoPlato) {
    this._dPS.actualizarEstadoPedidos(p.id, Estado.ENTREGADO).subscribe(res => {
      window.location.reload();
    })
  }

  actualizarBebida(p: DetallePedidoBebida) {
    this._dBS.actualizarEstadoPedidos(p.id, Estado.ENTREGADO).subscribe(res => {
      window.location.reload();
    })
  }


  imprimirCuenta() {
    this.impresionService.imprimirCuenta(this.pedidoBD).subscribe();
  }

  imprimirComanda() {
    this.impresionService.imprimirComandaPlatos(this.pedidoBD).subscribe();
  }

  cobrarPedido() {
    if (this.pedidoBD.notSomeonePendiente) {

      Swal.fire({
        title: "¿Desea cobrar pedido?",
        showCancelButton: true,
        confirmButtonText: "Cobrar pedido",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          let pago = new Pago();
          let idEmpleado = this.authService.usuario.id;
          let empleado = new Empleado();
          empleado.id = idEmpleado;
          pago.empleado = empleado;
          pago.cliente = this.pedidoBD.cliente;
          pago.estado = Estado.PENDIENTE;
          let tipoPago = new TipoPago();
          let tipoRecibo = new TipoRecibo();
          tipoPago.id = 1;
          tipoRecibo.id = 1;
          pago.tipoPago = tipoPago;
          pago.tipoRecibo = tipoRecibo;
          let pedidoToPago = new Pedido();
          pedidoToPago.id = this.pedidoBD.id;
          pedidoToPago.n_pedido = this.pedidoBD.n_pedido;
          pedidoToPago.pedidoDetallesBebidas = this.pedidoBD.pedidoDetallesBebidas;
          pedidoToPago.pedidoDetallesPlatos = this.pedidoBD.pedidoDetallesPlatos;
          pago.pedido = pedidoToPago;
          console.log(pago);
          
          this.pagoService.create(pago).subscribe(res => {
            console.log(res);
            Swal.fire("Pago Generado", "El area de CAJA recibio el pago pendiente", "success");
          })
        }
      });
    }
  }
}
