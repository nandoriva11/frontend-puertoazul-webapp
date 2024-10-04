import { Injectable } from '@angular/core';
import { CommonServiceStatusService } from './common-service-status.service';
import { Pago } from '../models/pago';
import { url_backend2 } from '../../assets/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService extends CommonServiceStatusService<Pago> {

  protected override baseEndPoint = url_backend2 + 'pagos';


  cobrarPago(pago: Pago): Observable<any> {
    return this.httpClient.put<any>(this.baseEndPoint + "/pagar/" + pago.id, pago);
  }

  anularPago(id: number): Observable<any> {
    return this.httpClient.get<any>(this.baseEndPoint + "/anular-pago/" + id);
  }

}
