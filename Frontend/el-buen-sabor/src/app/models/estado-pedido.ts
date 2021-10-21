import { Generic } from './generic';

enum Status {
  Pendiente = 'PENDIENTE',
  EnProceso = 'EN PROCESO',
  Terminado = 'TERMINADO',
  EnCamino = 'EN CAMINO',
}
export class EstadoPedido extends Generic {
  static readonly estado = Status;
  denominacion: string;
}
