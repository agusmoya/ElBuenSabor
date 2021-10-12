import { Generic } from './generic';
import { Provincia } from './provincia';

export class Departamento extends Generic {
  provincia: Provincia;
  constructor() {
    super();
    this.provincia = new Provincia();
  }
}
