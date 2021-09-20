import { Domicilio } from './domicilio';
import { Generic } from './generic';
import { Usuario } from './usuario';

export class Cliente extends Generic {
  apellido: string;
  telefono: number;
  email: string;
  usuario: Usuario;
  domicilio: Domicilio;
}
