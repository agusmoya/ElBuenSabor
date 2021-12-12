import { Injectable } from '@angular/core';
import { BASE_ENDPOINT } from '../config/app';
import { Factura } from '../models/factura';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class FacturaService extends CommonService<Factura> {
  protected baseEndpoint = BASE_ENDPOINT + '/facturas';
}
