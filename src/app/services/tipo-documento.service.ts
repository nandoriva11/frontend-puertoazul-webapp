import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { CommonServiceStatusService } from './common-service-status.service';
import { CategoriaPlato } from '../models/categoria-plato';
import { TipoDocumento } from '../models/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService extends CommonService<TipoDocumento>{

    protected override baseEndPoint = "http://localhost:9078/cevicheria/api/" + 'tipodocumento';
    
}
