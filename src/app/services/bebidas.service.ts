import { Injectable } from '@angular/core';
import { CommonServiceStatusService } from './common-service-status.service';
import { Bebida } from '../models/bebida';
import { Observable } from 'rxjs';
import { Plato } from '../models/plato';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BebidasService extends CommonServiceStatusService<Bebida> {

  protected override baseEndPoint = url_backend2 + 'bebidas';

  public crearConFoto(bebida: Bebida, archivo: File): Observable<Bebida> {
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('nombre', bebida.nombre);
    formData.append('tipo_bebida', bebida.tipo_bebida.id.toString());
    formData.append('estado', bebida.estado);
    formData.append('precio', bebida.precio.toString());
    return this.httpClient.post<Bebida>(this.baseEndPoint + '/crear-con-foto', formData)
  }

  public editarConFoto(bebida: Bebida, archivo: File, id: number): Observable<Bebida> {
    console.log(archivo);

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('nombre', bebida.nombre);
    formData.append('tipo_bebida', bebida.tipo_bebida.id.toString());
    formData.append('estado', bebida.estado);
    formData.append('precio', bebida.precio.toString());
    return this.httpClient.put<Bebida>(this.baseEndPoint + '/edit/' + id, formData)
  }

  getByTipo(idCategoria: number): Observable<Bebida[]> {
    return this.httpClient.get<Bebida[]>(this.baseEndPoint + "/listar-por-tipo-bebida/" + idCategoria);
  }
}
