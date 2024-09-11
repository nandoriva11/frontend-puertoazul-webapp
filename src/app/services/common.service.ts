import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GenericEntity } from '../models/generic-entity';

@Injectable({
  providedIn: 'root'
})
export class CommonService<E extends GenericEntity> {
  protected baseEndPoint!: string;

  constructor(protected httpClient: HttpClient) { }

  public listar(): Observable<E[]> {
    return this.httpClient.get<E[]>(this.baseEndPoint).pipe(
      map((res: any) => res.sort((a: any, b: any) => b.id - a.id)));
  }

  public getEntity(id: any): Observable<any> {
    return this.httpClient.get(this.baseEndPoint + "/" + id).pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );
  }

  public create(entity: E): Observable<any> {

    return this.httpClient.post(this.baseEndPoint, entity).pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );
  }


  public update(entity: E): Observable<any> {

    return this.httpClient.put(this.baseEndPoint + '/edit/' + entity.id, entity).pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );
  }

  public delete(id: Number): Observable<any> {
    return this.httpClient.delete(this.baseEndPoint + '/' + id).pipe(
      catchError(e => {
        return throwError(() => e);
      })
    );
  }



}
