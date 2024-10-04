import { Injectable } from '@angular/core';
import { TipoPago } from '../models/tipo-pago';
import { CommonService } from './common.service';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService extends CommonService<TipoPago> {

  protected override baseEndPoint = url_backend2 + 'tipo-pago';
}