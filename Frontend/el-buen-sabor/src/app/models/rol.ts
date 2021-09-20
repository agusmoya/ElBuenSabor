import { Generic } from './generic';

export class Rol extends Generic {
  imagenHashCode: number;
  constructor(pEstado: number = 1) {
    super();
    this.estado = pEstado;
  }
}
