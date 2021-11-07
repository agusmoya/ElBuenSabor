import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { EstadoPedido } from 'src/app/models/estado-pedido';
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
    private pedidoService: PedidoService,
    private _localStorageService: LocalStorageService
  ) {
    super(service);
    this.titulo = 'Listado de Pedidos';
    this.nombreModelo = Pedido.name;
    this.userLoggedInfo$ = this._localStorageService.userLogged$;
  }

  // ngOnInit(): void {
  //   super.ngOnInit();
  // }

  protected calcularRangos() {
    this.service
      .listarPaginado(
        this.paginaActual.toString(),
        this.totalPorPagina.toString()
      )
      .subscribe((paginador) => {
        this.lista = paginador.content as Pedido[];
        this.verificarRolUsuario();
        this.filtrarPedidosSegunEstado();
        this.totalRegistros = paginador.totalElements as number;
        if (this.paginator) {
          this.paginator._intl.itemsPerPageLabel = 'Elementos por página:';
        }
      });
  }

  verificarRolUsuario(): void {
    this.userLoggedInfo$.subscribe((user) => {
      if (user != undefined) {
        this.usuarioService.ver(user.id).subscribe((usuarioEncontrado) => {
          this.userRol = usuarioEncontrado.rol.denominacion;
        });
      }
    });
  }

  filtrarPedidosSegunEstado(): void {
    if (this.userRol === 'Cajero') {
      this.lista = this.lista?.filter((pedido) =>
        pedido.estadosPedido.forEach(
          (estado) =>
            estado.denominacion == 'PENDIENTE' ||
            estado.denominacion == 'RECHAZADO' ||
            estado.denominacion == 'TERMINADO'
        )
      );
      // console.log(this.lista);
    }
  }

  aprobarPedido(indicePedido: any): void {
    this.lista.forEach((pedido) => {
      if (pedido.id === indicePedido) {
        pedido.estadosPedido.push(
          new EstadoPedido(EstadoPedido.status.Aprobado)
        );
        this.pedidoService.editar(pedido).subscribe((pedidoEditado) => {
          console.log(pedidoEditado);
          this.filtrarPedidosSegunEstado();
        });
      }
    });
    // this.lista.splice(indicePedido, 1);
  }
}
