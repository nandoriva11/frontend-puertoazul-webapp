import { Component } from '@angular/core';
import { Mesa } from '../../../models/mesa';
import { Estado } from '../../../enums/estado';
import { MesasService } from '../../../services/mesas.service';
import { PedidosService } from '../../../services/pedidos.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Pedido } from '../../../models/pedido';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-misordenes',
  templateUrl: './misordenes.component.html',
  styleUrl: './misordenes.component.css'
})
export class MisordenesComponent {
  public mesas: Mesa[] = [];
  public pedidos: Pedido[] = [];
  public mesasActivas: Mesa[] = [];
  public cargando = true;
  public libre = Estado.LIBRE;
  public ocupado = Estado.OCUPADO;

  constructor(
    private mesaService: MesasService,
    private pedidoService: PedidosService,
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
  ) {
    this.getMesas();
  }

  getMesas() {
    this.activatedRouter.params.subscribe(
      params => {


        setTimeout(() => {
           this.pedidoService.getPedidosByEmpleado(this.authService.usuario.id, Estado.PENDIENTE).subscribe(
             {
               next: (v) => {
                 this.pedidos = v
                 console.log(this.pedidos);
                 this.cargando = false;
               },
               error: (err) => {
                 this.cargando = false;
                 console.log(err);
               }
             }
           )
        }, 600)


      })


  }


}
