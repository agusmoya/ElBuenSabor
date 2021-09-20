import { DetalleFactura } from './detalle-factura';
import { FormaPago } from './forma-pago';
import { Generic } from './generic';

export class Factura extends Generic {
  fecha: Date;
  numero: number;
  montoDescuento: number;
  nroTarjeta: string;
  formaPago: FormaPago;
  detallesFactura: DetalleFactura[] = [];
}
