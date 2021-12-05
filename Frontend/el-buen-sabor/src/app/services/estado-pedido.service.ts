import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { EstadoPedido } from '../models/estado-pedido';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class EstadoPedidoService extends CommonService<EstadoPedido> {
  protected baseEndpoint = BASE_ENDPOINT + '/estados-pedidos';

  constructor(http: HttpClient) {
    super(http);
  }
}
