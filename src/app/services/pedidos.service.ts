import { Injectable } from '@angular/core';
import { CommonServiceStatusService } from './common-service-status.service';
import { Mesa } from '../models/mesa';
import { Pedido } from '../models/pedido';
import { Observable } from 'rxjs';
import { Estado } from '../enums/estado';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService extends CommonServiceStatusService<Pedido> {

  protected override baseEndPoint = url_backend2 + 'pedidos';



  getPedidosByMesa(idMesa: number, estado: Estado | Estado.ALL): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(this.baseEndPoint + "/pedidos-mesa/" + idMesa + "/" + estado);
  }

  getPedidosByEmpleado(idEmpleado: number, estado: Estado | Estado.ALL): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(this.baseEndPoint + "/pedidos-empleado/" + idEmpleado + "/" + estado);
  }


  anularPedido(idPedido: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseEndPoint + "/anular-pedido/" + idPedido);
  }

  actualizarPedidos(idPedido: number, estado: Estado): Observable<any[]> {
    return this.httpClient.put<any[]>(this.baseEndPoint + "/editar-estado-pedido/" + idPedido + "/" + estado, null);
  }

}
