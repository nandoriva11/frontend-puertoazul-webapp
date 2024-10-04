import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { TipoRecibo } from '../models/tipo-recibo';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoReciboService extends CommonService<TipoRecibo> {

  protected override baseEndPoint = url_backend2 + 'tipo-recibo';
}