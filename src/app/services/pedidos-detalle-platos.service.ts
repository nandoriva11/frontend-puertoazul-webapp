import { Injectable } from '@angular/core';
import { CommonServiceStatusService } from './common-service-status.service';
import { Mesa } from '../models/mesa';
import { Pedido } from '../models/pedido';
import { DetallePedidoPlato } from '../models/detalle-pedido-plato';
import { Estado } from '../enums/estado';
import { Observable } from 'rxjs';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosDetallePlatosService extends CommonServiceStatusService<DetallePedidoPlato> {

  protected override baseEndPoint = url_backend2 + 'pedido-detalle-platos';

  actualizarEstadoPedidos(idPedido: number, estado: Estado): Observable<any[]> {
    return this.httpClient.put<any[]>(this.baseEndPoint + "/editar-estado-pedido/" + idPedido + "/" + estado, null);
  }

}
