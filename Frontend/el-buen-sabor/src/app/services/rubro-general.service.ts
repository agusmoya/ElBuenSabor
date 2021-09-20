import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { RubroGeneral } from '../models/rubro-general';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class RubroGeneralService extends CommonService<RubroGeneral>{

  protected baseEndpoint = BASE_ENDPOINT + '/rubros-generales';

  constructor(http: HttpClient) {
    super(http);
  }

  public verFoto(rubroGeneral: RubroGeneral): Observable<any> {
    return this.http.get<any>(`${this.baseEndpoint}/cargar/img/${rubroGeneral.id}`);
  }

  public crearConFoto(rubroGeneral: RubroGeneral, archivo: File): Observable<RubroGeneral> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('denominacion', rubroGeneral.denominacion);
    return this.http.post<RubroGeneral>(this.baseEndpoint + '/crear-con-foto', formData);
  }

  public editarConFoto(rubroGeneral: RubroGeneral, archivo: File): Observable<RubroGeneral> {
    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('denominacion', rubroGeneral.denominacion);
    formData.append('estado', rubroGeneral.estado.toString());

    return this.http.put<RubroGeneral>(
      `${this.baseEndpoint}/editar-con-foto/${rubroGeneral.id}`,
      formData
    );
  }
}
