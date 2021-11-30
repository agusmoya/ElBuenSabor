import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { EstadoPedido } from 'src/app/models/estado-pedido';
import { Pedido } from 'src/app/models/pedido';
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

  protected calcularRangos() {
    this.service
      .listarPaginado(
        this.paginaActual.toString(),
        this.totalPorPagina.toString()
      )
      .subscribe((paginador) => {
        this.lista = paginador.content as Pedido[];
        this.verificarRolUsuario();
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
          this.filtrarPedidosSegunEstado_Rol();
        });
      }
    });
  }

  filtrarPedidosSegunEstado_Rol(): void {
    if (this.userRol == 'Cajero') {
      this.lista = this.lista?.filter((pedido) =>
        pedido.estadosPedido.forEach(
          (estado) =>
            estado.denominacion == 'PENDIENTE' ||
            estado.denominacion == 'RECHAZADO' ||
            estado.denominacion == 'EN PROCESO' ||
            estado.denominacion == 'TERMINADO'
        )
      );
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
            pedido.estadosPedido.push(
              new EstadoPedido(EstadoPedido.status.Aprobado)
            );
            this.pedidoService.editar(pedido).subscribe((pedidoEditado) => {
              console.log(pedidoEditado);
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

        // this.service.eliminar(entity).subscribe(() => {
        //   this.calcularRangos();
        //   Swal.fire(
        //     'Eliminado',
        //     `${this.nombreModelo} *${this.denominacionEntidad}* eliminado con éxito`,
        //     'success'
        //   );
        // });
      }
    });
  }

  rechazarPedido(indicePedido: any): void {
    this.lista.forEach((pedido) => {
      if (pedido.id == indicePedido) {
        pedido.estadosPedido.push(
          new EstadoPedido(EstadoPedido.status.Rechazado)
        );
        this.pedidoService.editar(pedido).subscribe((pedidoEditado) => {
          console.log(pedidoEditado);
          this.filtrarPedidosSegunEstado_Rol();
        });
        return;
      }
    });
  }
}
