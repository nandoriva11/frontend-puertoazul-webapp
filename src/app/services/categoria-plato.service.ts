import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { CommonServiceStatusService } from './common-service-status.service';
import { CategoriaPlato } from '../models/categoria-plato';
import { Observable } from 'rxjs';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaPlatoService extends CommonService<CategoriaPlato> {

  protected override baseEndPoint = url_backend2 + 'categoria-plato';


}
