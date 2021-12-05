import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { EstadoPedido } from 'src/app/models/estado-pedido';
import { Pedido } from 'src/app/models/pedido';
import { EstadoPedidoService } from 'src/app/services/estado-pedido.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
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
  userId: number;
  estadosPedidos: EstadoPedido[];

  constructor(
    service: PedidoService,
    private estadoPedidoService: EstadoPedidoService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private _localStorageService: LocalStorageService
  ) {
    super(service);
    this.titulo = 'Listado de Pedidos';
    this.nombreModelo = Pedido.name;
    this.userLoggedInfo$ = this._localStorageService.userLogged$;
    this.estadosPedidos = [];
  }

  protected calcularRangos() {
    this.service
      .listarPaginado(
        this.paginaActual.toString(),
        this.totalPorPagina.toString()
      )
      .subscribe((paginador) => {
        this.listarEstadosPedidos();
        this.lista = paginador.content as Pedido[];
        this.verificarRolUsuario();
        this.totalRegistros = paginador.totalElements as number;
        if (this.paginator) {
          this.paginator._intl.itemsPerPageLabel = 'Elementos por página:';
        }
      });
  }

  listarEstadosPedidos(): void {
    this.estadoPedidoService.listar().subscribe((estadosPedidos) => {
      this.estadosPedidos = estadosPedidos;
    });
  }

  verificarExistenciaEstadoPedido(pedido: Pedido, estadoAbuscar: string): void {
    console.log(this.estadosPedidos);
    if (this.estadosPedidos) {
      for (const estado of this.estadosPedidos) {
        if (estado.denominacion == estadoAbuscar) {
          pedido.estadoPedido = estado;
          return;
        }
      }
      pedido.estadoPedido = new EstadoPedido(estadoAbuscar);
    }
  }

  verificarRolUsuario(): void {
    this.userLoggedInfo$.subscribe((user) => {
      if (user != undefined) {
        this.usuarioService.ver(user.id).subscribe((usuarioEncontrado) => {
          this.userRol = usuarioEncontrado.rol.denominacion;
          this.userId = usuarioEncontrado.id;
          this.filtrarPedidosSegunEstado_Rol();
        });
      }
    });
  }

  filtrarPedidosSegunEstado_Rol(): void {
    if (this.userRol == 'Cajero') {
      console.log('Soy Cajero');
      console.log(this.lista);

      this.lista = this.lista?.filter(
        (pedido) =>
          // pedido.estadosPedido.forEach(
          //   (estado) =>
          //     estado.estado == 1 &&
          //     (estado.denominacion == 'RECHAZADO' ||
          //       estado.denominacion == 'PENDIENTE' ||
          //       estado.denominacion == 'TERMINADO')
          // )
          pedido.estadoPedido.estado == 1 &&
          (pedido.estadoPedido.denominacion == 'RECHAZADO' ||
            pedido.estadoPedido.denominacion == 'PENDIENTE' ||
            pedido.estadoPedido.denominacion == 'EN PROCESO' ||
            pedido.estadoPedido.denominacion == 'TERMINADO')
      );
    }
    if (this.userRol == 'Cocinero') {
      console.log('Soy Cocinero');
      this.lista = this.lista?.filter(
        (pedido) =>
          pedido.estadoPedido.estado == 1 &&
          pedido.estadoPedido.denominacion == 'APROBADO'
      );
    }
    if (this.userRol == 'Cliente') {
      console.log('Soy Cliente');

      this.lista = this.lista?.filter(
        (pedido) => pedido.cliente.id == this.userId
      );
    }
    if (this.userRol == 'Administrador') {
      console.log('Soy Admin');
    }
  }

  aprobarPedido(indicePedido: any): void {
    this.lista.forEach((pedido) => {
      if (pedido.id == indicePedido) {
        Swal.fire({
          title: `Atención`,
          text: `¿Seguro que desea APROBAR el PEDIDO nro *${pedido.numero}*?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            pedido.estado = 1;

            this.verificarExistenciaEstadoPedido(
              pedido,
              EstadoPedido.status.Aprobado
            );

            this.pedidoService.editar(pedido).subscribe((pedidoEditado) => {
              console.log(pedidoEditado);
              this.listarEstadosPedidos();
              this.filtrarPedidosSegunEstado_Rol();
            });
            Swal.fire(
              'Aprobado',
              `El pedido nro. ${pedido.numero} ha sido enviado a Cocina. Hora de entrega: ${pedido.horaEstimadaFin}`,
              'success'
            );
            return;
          }
        });
      }
    });
  }

  rechazarPedido(indicePedido: any): void {
    this.lista.forEach((pedido) => {
      if (pedido.id == indicePedido) {
        console.log(pedido.numero);
        console.log(pedido.horaEstimadaFin);
        Swal.fire({
          title: `Atención`,
          text: `¿Seguro que desea RECHAZAR el PEDIDO nro *${pedido.numero}*?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            pedido.estado = 0;
            this.verificarExistenciaEstadoPedido(
              pedido,
              EstadoPedido.status.Rechazado
            );
            this.pedidoService.editar(pedido).subscribe((pedidoEditado) => {
              console.log(pedidoEditado);
              this.listarEstadosPedidos();
              this.filtrarPedidosSegunEstado_Rol();
            });

            Swal.fire(
              'Aprobado',
              `El pedido nro. ${pedido.numero} ha sido rechazado`,
              'success'
            );
            return;
          }
        });
      }
    });
  }
}
