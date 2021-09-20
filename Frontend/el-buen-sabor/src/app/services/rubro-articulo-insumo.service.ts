import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { RubroArticuloInsumo } from '../models/rubro-articulo-insumo';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class RubroArticuloInsumoService extends CommonService<RubroArticuloInsumo> {

  protected baseEndpoint = BASE_ENDPOINT + '/rubros-articulo-insumo';

  constructor(http: HttpClient) {
    super(http);
  }

  public findAllRubrosArticulosInsumo(): Observable<RubroArticuloInsumo[]> {
    return this.http.get<RubroArticuloInsumo[]>(`${this.baseEndpoint}`);
  }
}
