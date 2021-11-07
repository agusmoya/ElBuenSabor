import { Generic } from './generic';
import { Rol } from './rol';

export class Usuario extends Generic {
  clave: string;
  rol: Rol;
  imagenHashCode: number = 0;
}
