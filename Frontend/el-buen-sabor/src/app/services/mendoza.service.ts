import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MendozaService {
  constructor(private http: HttpClient) {}

  public getAllDepartamentos(): Observable<any> {
    return this.http.get<any>(
      'https://apis.datos.gob.ar/georef/api/departamentos?provincia=mendoza&max=18'
    );
  }

  public getLocalidadesXdepartamento(departamento: string): Observable<any> {
    return this.http.get<any>(
      `https://apis.datos.gob.ar/georef/api/localidades?provincia=mendoza&departamento=${departamento}`
    );
  }
}
