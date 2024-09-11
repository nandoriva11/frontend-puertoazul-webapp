import { Injectable } from '@angular/core';
import { CommonServiceStatusService } from './common-service-status.service';
import { Empleado } from '../models/empleado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService extends CommonServiceStatusService<Empleado> {

  protected override baseEndPoint = "http://localhost:9078/cevicheria/api/" + 'empleados';

  public crearConFoto(empleado: Empleado, archivo: File): Observable<Empleado> {
    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('nombres', empleado.nombre);
    formData.append('apellidos', empleado.apellidos);
    formData.append('fecha_nac', empleado.fecha_nac.toString());
    formData.append('num_doc', empleado.num_doc);
    formData.append('genero', empleado.genero);
    formData.append('estado_civil', empleado.estado_civil);
    formData.append('celular', empleado.celular);
    formData.append('email', empleado.email);
    formData.append('fecha_registro', empleado.fecha_registro.toString());
    formData.append('desc_empleado', empleado.desc_empleado);
    formData.append('direccion', empleado.direccion);
    formData.append('cargo', empleado.cargo.id.toString());
    formData.append('tipo_documento', empleado.tipo_documento.id.toString());
    formData.append('distrito', empleado.distrito.id.toString());
    return this.httpClient.post<Empleado>(this.baseEndPoint + '/crear-con-foto', formData)
  }

  public editarConFoto(empleado: Empleado, archivo: File, id: number): Observable<Empleado> {

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('nombres', empleado.nombre);
    formData.append('apellidos', empleado.apellidos);
    formData.append('fecha_nac', empleado.fecha_nac.toString());
    formData.append('num_doc', empleado.num_doc);
    formData.append('genero', empleado.genero);
    formData.append('estado_civil', empleado.estado_civil);
    formData.append('celular', empleado.celular);
    formData.append('email', empleado.email);
    formData.append('fecha_registro', empleado.fecha_registro.toString());
    formData.append('desc_empleado', empleado.desc_empleado);
    formData.append('direccion', empleado.direccion);
    formData.append('cargo', empleado.cargo.id.toString());
    formData.append('tipo_documento', empleado.tipo_documento.id.toString());
    formData.append('distrito', empleado.distrito.id.toString());
    return this.httpClient.put<Empleado>(this.baseEndPoint + '/edit/' + id, formData)
  }


  verifyDNI(dni: string): Observable<any> {
    return this.httpClient.get(this.baseEndPoint + "/dni/" + dni);
  }

  verifyEmail(email: string): Observable<any> {
    return this.httpClient.get(this.baseEndPoint + "/email/" + email);
  }

}