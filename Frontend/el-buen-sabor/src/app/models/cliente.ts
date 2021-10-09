import { Domicilio } from './domicilio';
import { Generic } from './generic';
import { Usuario } from './usuario';

export class Cliente extends Generic {
  nombre: string;
  apellido: string;
  telefono: number;
  email: string;
  usuario: Usuario;
  domicilio: Domicilio;
}
