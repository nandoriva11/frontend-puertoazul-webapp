import { Component } from '@angular/core';
import { Pedido } from '../../../models/pedido';
import { MesasService } from '../../../services/mesas.service';
import { PedidosService } from '../../../services/pedidos.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Estado } from '../../../enums/estado';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {

  public pedidos: Pedido[] = [];
  public cargando = true;

  constructor(
    private mesaService: MesasService,
    private pedidoService: PedidosService,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
  ) {
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidoService.getByStatus(Estado.PENDIENTE).subscribe(
      res => {
        this.pedidos = [];
        this.cargando = true;
        setTimeout(() => {
          this.pedidos = res;
          this.cargando = false;
        }, 1000)
      }
    )
  }
}
