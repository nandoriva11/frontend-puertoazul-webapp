import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReniecModelClass } from '../models/reniec-model-class';
import { url_backend2 } from '../../assets/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReniecServiceService {

  private baseEndPoint: string = url_backend2 + "reniec-api";



  constructor(private http: HttpClient) { }

  getPersonaFromReniecByDNI(dni: string): Observable<ReniecModelClass> {
    return this.http.get<ReniecModelClass>(this.baseEndPoint + "/cliente/" + dni).pipe(map((obj: any) => {
      return obj.persona;
    }));
  }
}
