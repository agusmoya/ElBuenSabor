import { Departamento } from './departamento';
import { Generic } from './generic';

export class Localidad extends Generic {
  departamento: Departamento;
}
