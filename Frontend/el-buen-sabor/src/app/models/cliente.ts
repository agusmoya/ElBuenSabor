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

  constructor(nombre: string = '', apellido: string = '', email: string = '') {
    super();
    this.domicilio = new Domicilio();
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
  }
}
