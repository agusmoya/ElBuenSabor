import { Generic } from './generic';

enum Status {
  Pendiente = 'PENDIENTE',
  Aprobado = 'APROBADO',
  Rechazado = 'RECHAZADO',
  EnProceso = 'EN PROCESO',
  Terminado = 'TERMINADO',
  EnDelivery = 'EN DELIVERY',
  Facturado = 'FACTURADO',
}
export class EstadoPedido extends Generic {
  static readonly status = Status;
  denominacion: string;

  constructor(denominacion: string) {
    super();
    this.denominacion = denominacion;
  }
}
