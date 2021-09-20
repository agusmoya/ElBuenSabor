import { Injectable } from '@angular/core';
import { Factura } from '../models/factura';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class FacturaService extends CommonService<Factura> {
  protected baseEndpoint = 'http://localhost:9000/api/el-buen-sabor/facturas/';
}
