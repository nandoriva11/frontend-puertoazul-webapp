import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { CommonServiceStatusService } from './common-service-status.service';
import { CategoriaPlato } from '../models/categoria-plato';

@Injectable({
  providedIn: 'root'
})
export class CategoriaPlatoService extends CommonService<CategoriaPlato>{

    protected override baseEndPoint = "http://localhost:9078/cevicheria/api/" + 'categoria-plato';
}
