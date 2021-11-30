import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_ENDPOINT } from '../config/app';
import { Pedido } from '../models/pedido';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService extends CommonService<Pedido> {
  protected baseEndpoint = BASE_ENDPOINT + '/pedidos';

  constructor(http: HttpClient) {
    super(http);
  }

  public crearPreferencia(pedido: Pedido): Observable<any> {
    return this.http.post<any>(
      `${this.baseEndpoint}/createAndRedirect`,
      pedido,
      {
        headers: this.cabeceras,
      }
    );
  }

  public obtenerUltimoNroPedido(): Observable<number> {
    return this.http.get<number>(`${this.baseEndpoint}/nro-pedido`);
  }
}
