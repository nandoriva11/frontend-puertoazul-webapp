import { Injectable } from '@angular/core';
import { CommonServiceStatusService } from './common-service-status.service';
import { Mesa } from '../models/mesa';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesasService extends CommonServiceStatusService<Mesa> {

  protected override baseEndPoint = url_backend2 + 'mesas';


}
