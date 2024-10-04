import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.token;
    if (token != null) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(authReq).pipe(
        catchError(err => {
          let no_permiso = err.error.error;
          let status = err.status;
          
          if(status === 503){
            Swal.fire('Sin Conexión', err.error.message, 'error');
          }
          if(status === 0){
            Swal.fire('Sin Conexion','El servidor no se encuentra activo, intentelo despues', 'error')
            this.authService.logout();
            this.router.navigateByUrl('/login')
          }
          
          if(no_permiso === "access_denied"){
            Swal.fire('No tienes permisos','No tienes permisos suficientes','error');
            this.router.navigateByUrl("/sistema/")
          }

          if(no_permiso === "invalid_token"){
            this.authService.logout();
            window.location.reload();
          }


          return throwError(err);
        })
      );
    }
    return next.handle(request);
  }
}
