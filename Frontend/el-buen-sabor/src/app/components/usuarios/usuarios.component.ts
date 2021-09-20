import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent
  extends CommonListarComponent<Usuario, UsuarioService>
  implements OnInit
{

  baseEndpoint = BASE_ENDPOINT + '/usuarios'

  constructor(service: UsuarioService) {
    super(service);
    this.titulo = 'Listado de Usuarios';
    this.nombreModelo = Usuario.name;
  }
}
