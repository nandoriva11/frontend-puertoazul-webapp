import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { TipoBebida } from '../models/tipo-bebida';

@Injectable({
  providedIn: 'root'
})
export class TipoBebidaService extends CommonService<TipoBebida> {

  protected override baseEndPoint = "http://localhost:9078/cevicheria/api/" + 'tipo-bebida';
}
