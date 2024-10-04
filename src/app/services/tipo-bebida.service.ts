import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { TipoBebida } from '../models/tipo-bebida';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoBebidaService extends CommonService<TipoBebida> {

  protected override baseEndPoint = url_backend2 + 'tipo-bebida';
}
