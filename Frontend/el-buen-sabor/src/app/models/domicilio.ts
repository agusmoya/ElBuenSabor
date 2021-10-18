import { Generic } from './generic';
import { Localidad } from './localidad';

export class Domicilio extends Generic {
  numero: number;
  calle: string;
  localidad: Localidad;

  constructor(calle: string = '') {
    super();
    this.calle = calle;
    this.localidad = new Localidad();
  }
}
