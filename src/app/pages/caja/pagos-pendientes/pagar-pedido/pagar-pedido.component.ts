import { Component } from '@angular/core';
import { Pago } from '../../../../models/pago';
import { PedidosService } from '../../../../services/pedidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosDetalleBebidasService } from '../../../../services/pedidos-detalle-bebidas.service';
import { PedidosDetallePlatosService } from '../../../../services/pedidos-detalle-platos.service';
import { ImpresionService } from '../../../../services/impresion.service';
import { PagoService } from '../../../../services/pago.service';
import { AuthService } from '../../../../services/auth.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../../../services/forms.service';
import { TipoPagoService } from '../../../../services/tipo-pago.service';
import { TipoRecibo } from '../../../../models/tipo-recibo';
import { TipoPago } from '../../../../models/tipo-pago';
import { TipoReciboService } from '../../../../services/tipo-recibo.service';

@Component({
  selector: 'app-pagar-pedido',
  templateUrl: './pagar-pedido.component.html',
  styleUrl: './pagar-pedido.component.css'
})
export class PagarPedidoComponent {
  public pagoDB!: Pago;
  public formPago!: FormGroup;
  public formSubmited = false;
  public tipos_pagos: TipoPago[] = [];
  public tipos_recibo: TipoRecibo[] = [];
  constructor(

    private _aR: ActivatedRoute,
    private router: Router,

    private pagoService: PagoService,
    private authService: AuthService,
    private formBuild: FormBuilder,
    public _formS: FormsService,
    private _tPagoS: TipoPagoService,
    private _tipoRecibo: TipoReciboService
    /* private _tTipoReciboS: TipoRecibo */
  ) {
    this.getPedido();
    this.createForm();
    this.listarTipoPago();
    this.listarTipoRecibo();
  }

  getPedido() {
    this._aR.params.subscribe(
      {
        "next": (params) => {
          let id = params['id'];
          if (id) {
            this.pagoService.getEntity(id).subscribe({
              "next": (res) => {
                this.pagoDB = res.objeto
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

  listarTipoPago() {
    this._tPagoS.listar().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.tipos_pagos = res
        }
      }
    )
  }


  listarTipoRecibo() {
    this._tipoRecibo.listar().subscribe(
      {
        next: (res) => {
          console.log(res);

          this.tipos_recibo = res
        }
      }
    )
  }


  pagarPedido() {
    this.formSubmited = true;
    console.log(this.pagoDB);
    console.log("hola");
    
    if (this.formPago.valid) {
      this.pagoDB.tipoPago = this.formPago.get('tipoPago')?.value;
      this.pagoDB.tipoRecibo = this.formPago.get('tipoRecibo')?.value;
      this.pagoService.cobrarPago(this.pagoDB).subscribe(
        res =>{
          console.log(res);
          
        }
      )
    }

  }

  createForm() {
    this.formPago = this.formBuild.group({
      tipoPago: [null, [Validators.required]],
      tipoRecibo: [null, [Validators.required]]
    })
  }

}

