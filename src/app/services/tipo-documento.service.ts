import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { CommonServiceStatusService } from './common-service-status.service';
import { CategoriaPlato } from '../models/categoria-plato';
import { TipoDocumento } from '../models/tipo-documento';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService extends CommonService<TipoDocumento>{

    protected override baseEndPoint = url_backend2 + 'tipodocumento';
    
}
