import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Pedido } from '../models/pedido';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class MercadoPagoService extends CommonService<Pedido>{

  protected baseEndpoint = BASE_ENDPOINT + '/mercado-pago';

  constructor(http: HttpClient) {
    super(http);
  }

  public crearPreferencia(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseEndpoint}/createAndRedirect`, pedido, {
      headers: this.cabeceras,
    });
  }
}
