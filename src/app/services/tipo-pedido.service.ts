import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { CommonServiceStatusService } from './common-service-status.service';
import { CategoriaPlato } from '../models/categoria-plato';
import { Cargo } from '../models/cargo';
import { Cliente } from '../models/cliente';
import { TipoPedido } from '../models/tipo-pedido';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPedidoService extends CommonService<TipoPedido>{

    protected override baseEndPoint = url_backend2+ 'tipo-pedido';

}
