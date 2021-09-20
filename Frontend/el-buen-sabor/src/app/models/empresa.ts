import { Generic } from './generic';

export class Empresa extends Generic {
  descripcion: string;
  email: string;
  telefono: string;
  cantidadEmpleados: number;
  tokenMercadoPago: string;
}
