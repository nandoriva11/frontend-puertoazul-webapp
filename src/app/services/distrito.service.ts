import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { CommonServiceStatusService } from './common-service-status.service';
import { CategoriaPlato } from '../models/categoria-plato';
import { Cargo } from '../models/cargo';
import { Distrito } from '../models/distrito';

@Injectable({
  providedIn: 'root'
})
export class DistritoService extends CommonService<Distrito>{

    protected override baseEndPoint = "http://localhost:9078/cevicheria/api/" + 'distritos';

}
