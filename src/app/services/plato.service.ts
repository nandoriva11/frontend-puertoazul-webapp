import { Injectable } from '@angular/core';
import { CommonServiceStatusService } from './common-service-status.service';
import { Plato } from '../models/plato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatoService extends CommonServiceStatusService<Plato> {

  protected override baseEndPoint = "http://localhost:9078/cevicheria/api/" + 'platos';


  public crearConFoto(plato: Plato, archivo: File): Observable<Plato> {
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('nombre', plato.nombre);
    formData.append('categoriaPlato', plato.categoriaPlato.id.toString());
    formData.append('estado', plato.estado);
    formData.append('precio', plato.precio.toString());
    return this.httpClient.post<Plato>(this.baseEndPoint + '/crear-con-foto', formData)
  }

  public editarConFoto(plato: Plato, archivo: File, id: number): Observable<Plato> {
    console.log(archivo);
    
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('nombre', plato.nombre);
    formData.append('categoriaPlato', plato.categoriaPlato.id.toString());
    formData.append('estado', plato.estado);
    formData.append('precio', plato.precio.toString());
    return this.httpClient.put<Plato>(this.baseEndPoint + '/edit/' + id, formData)
  }
}
