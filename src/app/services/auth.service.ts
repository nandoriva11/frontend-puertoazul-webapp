import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empleado } from '../models/empleado';


import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { UsuarioEmpleado } from '../models/usuario-empleado';
import { Rol } from '../models/rol';
import { environment, url_backend } from '../../assets/environments/environment.prod';
import { url_backend2 } from '../../assets/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* private url = "http://192.168.1.19:9078/cevicheria/api/login"; */
  private url = url_backend2 + 'login';

  private _usuario!: UsuarioEmpleado;
  private _token!: string | null;
  private urlAuth: string = this.url;

  constructor(private http: HttpClient) { }

  public get usuario(): UsuarioEmpleado {

    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && localStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(localStorage.getItem('usuario') || '') as UsuarioEmpleado;
    }
    return new UsuarioEmpleado();
  }

  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && localStorage.getItem('token') != null) {
      this._token = localStorage.getItem('token') || '';
      return this._token;
    }
    return null;
  }

  login(usuario: UsuarioEmpleado) {
    let loginClass = { "email": usuario.email, "password": usuario.password };
    return this.http.post<any>(this.urlAuth, loginClass).pipe(
      catchError(
        (err) => {
          return throwError(() => err)
        }
      )
    );
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem('token', accessToken);
  }
  guardarUser(accessToken: string): void {
    this._token = accessToken;
    localStorage.setItem('token', accessToken);
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    let user_token = JSON.parse(payload.usuario)
    let res = JSON.parse(payload.authorities) as [];
    this._usuario = new UsuarioEmpleado();
    this._usuario.email = payload.sub;
    this._usuario.id = user_token.id;
    this._usuario.nombre = user_token.nombres;
    
    res.forEach((obj: any) => {
      this._usuario.roles.push({ "id": 0, "nombre": obj.authority })
    })
    localStorage.setItem("usuario", JSON.stringify(this._usuario));
  }

  getRoles(accessToken: string): any[] {
    let payload = this.obtenerDatosToken(accessToken);
    return JSON.parse(payload.authorities);
  }



  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {

    if (this.token) {
      let payload = this.obtenerDatosToken(this.token);
      if (payload != null && payload.sub && payload.sub.length > 0) {
        return true;
      }
    }
    return false;
  }

  hasRole(role: string): boolean {
    let rol = new Rol();
    rol.id = 0;
    rol.nombre = role;
    if (this.usuario.roles.includes(rol)) {
      return true;
    }
    return false;
  }


  logout(): void {
    this._token = null as any;
    this._usuario = null as any;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }







}
