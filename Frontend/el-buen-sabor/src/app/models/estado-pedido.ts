import { Generic } from './generic';

enum Status {
  Pendiente = 'PENDIENTE',
  Aprobado = 'APROBADO',
  EnProceso = 'EN PROCESO',
  Terminado = 'TERMINADO',
  EnCamino = 'EN CAMINO',
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
