import { Injectable } from '@angular/core';
import { Pedido } from '../models/pedido';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService extends CommonService<Pedido> {
  protected baseEndpoint = 'http://localhost:9000/api/el-buen-sabor/pedidos/';
}
