import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { Pedido } from 'src/app/models/pedido';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent
  extends CommonListarComponent<Pedido, PedidoService>
  implements OnInit
{
  baseEndpoint = BASE_ENDPOINT + '/pedidos';
  userLoggedInfo$: any;
  userRol: string;

  constructor(
    service: PedidoService,
    private usuarioService: UsuarioService,
    private _localStorageService: LocalStorageService
  ) {
    super(service);
    this.titulo = 'Listado de Pedidos';
    this.nombreModelo = Pedido.name;
    this.userLoggedInfo$ = this._localStorageService.userLogged$;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.verificarRolUsuario();
    this.filtrarPedidosSegunEstado();
  }

  verificarRolUsuario(): void {
    this.userLoggedInfo$.subscribe((user) => {
      this.usuarioService.ver(user.id).subscribe((usuarioEncontrado) => {
        console.log(usuarioEncontrado);
        this.userRol = usuarioEncontrado.rol.denominacion;
      });
    });
  }

  filtrarPedidosSegunEstado(): void {
    if (this.userRol === 'Cocinero' || this.userRol === 'Administrador') {
      this.lista = this.lista?.filter((pedido) =>
        pedido.estadosPedido.forEach((estado) => {
          estado.denominacion === 'PENDIENTE' ||
            estado.denominacion === 'TERMINADO';
        })
      );
    }
  }
}
