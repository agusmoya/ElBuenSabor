import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { DetalleFactura } from 'src/app/models/detalle-factura';
import { EstadoPedido } from 'src/app/models/estado-pedido';
import { Factura } from 'src/app/models/factura';
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
  total: number;

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
    // console.log(this.estadosPedidos);
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
      // console.log(this.lista);
      this.lista = this.lista?.filter(
        (pedido) =>
          pedido.estadoPedido.estado == 1 &&
          (pedido.estadoPedido.denominacion == 'RECHAZADO' ||
            pedido.estadoPedido.denominacion == 'PENDIENTE' ||
            pedido.estadoPedido.denominacion == 'TERMINADO' ||
            pedido.estadoPedido.denominacion == 'FACTURADO')
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
        (pedido) =>
          pedido.cliente.id == this.userId &&
          (pedido.estadoPedido.denominacion == 'RECHAZADO' ||
            pedido.estadoPedido.denominacion == 'PENDIENTE' ||
            pedido.estadoPedido.denominacion == 'TERMINADO' ||
            pedido.estadoPedido.denominacion == 'FACTURADO')
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
            this.verificarExistenciaEstadoPedido(
              pedido,
              EstadoPedido.status.Aprobado
            );

            this.pedidoService.editar(pedido).subscribe((pedidoEditado) => {
              this.listarEstadosPedidos();
              this.filtrarPedidosSegunEstado_Rol();
            });
            Swal.fire(
              'Aprobado',
              `El pedido nro. ${pedido.numero} ha sido enviado a Cocina. 
              Hora de entrega: ${pedido.horaEstimadaFin}`,
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
        // console.log(pedido.numero);
        // console.log(pedido.horaEstimadaFin);
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
            this.verificarExistenciaEstadoPedido(
              pedido,
              EstadoPedido.status.Rechazado
            );
            this.pedidoService.editar(pedido).subscribe((pedidoEditado) => {
              this.listarEstadosPedidos();
              this.filtrarPedidosSegunEstado_Rol();
            });

            Swal.fire(
              'Rechazado',
              `El pedido nro. ${pedido.numero} ha sido rechazado`,
              'success'
            );
            return;
          }
        });
      }
    });
  }

  terminarPedido(indicePedido: any): void {
    this.lista.forEach((pedido) => {
      if (pedido.id == indicePedido) {
        Swal.fire({
          title: `Atención`,
          text: `¿Seguro que desea marcar como TERMINADO el PEDIDO nro *${pedido.numero}*?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.verificarExistenciaEstadoPedido(
              pedido,
              EstadoPedido.status.Terminado
            );
            this.pedidoService.editar(pedido).subscribe((pedidoEditado) => {
              this.listarEstadosPedidos();
              this.filtrarPedidosSegunEstado_Rol();
            });

            Swal.fire(
              'Finalizado',
              `El pedido nro. ${pedido.numero} ha sido marcado como Terminado`,
              'success'
            );
            return;
          }
        });
      }
    });
  }

  facturarPedido(pedidoAfacturar: Pedido): void {
    this.lista.forEach((pedido) => {
      if (pedido.id == pedidoAfacturar.id) {
        Swal.fire({
          title: `Atención`,
          text: `¿Seguro que desea FACTURAR el PEDIDO nro *${pedido.numero}*?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            this.verificarExistenciaEstadoPedido(
              pedido,
              EstadoPedido.status.Facturado
            );
            this.crearFacturaPedido(pedidoAfacturar);
            this.pedidoService.editar(pedido).subscribe((pedidoEditado) => {
              this.listarEstadosPedidos();
              this.filtrarPedidosSegunEstado_Rol();
            });

            Swal.fire(
              'Finalizado',
              `El pedido nro. ${pedido.numero} ha sido Facturado`,
              'success'
            );
            return;
          }
        });
      }
    });
  }

  crearFacturaPedido(pedidoAfacturar: Pedido) {
    console.log('Pedido a facturar:', pedidoAfacturar);

    pedidoAfacturar.factura = new Factura();
    pedidoAfacturar.factura.fecha = new Date();
    pedidoAfacturar.factura.numero = pedidoAfacturar.numero;

    pedidoAfacturar.factura.montoDescuento =
      pedidoAfacturar.tipoEnvio == 0 ? this.total * 0.1 : 0;

    if (pedidoAfacturar.mercadoPagoDatos) {
      pedidoAfacturar.factura.nroTarjeta =
        pedidoAfacturar.mercadoPagoDatos.nroTarjeta;
      pedidoAfacturar.factura.formaPago.denominacion =
        pedidoAfacturar.mercadoPagoDatos.formaPago;
    } else {
      pedidoAfacturar.factura.nroTarjeta = null;
      pedidoAfacturar.factura.formaPago.denominacion = 'efectivo';
    }

    pedidoAfacturar.detallesPedido.forEach((detallePedido) => {
      this.total = 0;
      let detalleFactura = new DetalleFactura();

      detalleFactura.cantidad = detallePedido.cantidad;
      detalleFactura.subtotal = detallePedido.subtotal;
      this.total += detallePedido.subtotal;
      detalleFactura.articuloManufacturado =
        detallePedido.articuloManufacturado;
      detalleFactura.articuloInsumo = detallePedido.articuloInsumo;

      pedidoAfacturar.factura.detallesFactura.push(detalleFactura);
    });

    if (pedidoAfacturar.tipoEnvio == 0) {
      pedidoAfacturar.factura.montoDescuento = this.total * 0.1;
    }

    this.verificarExistenciaEstadoPedido(
      pedidoAfacturar,
      EstadoPedido.status.Facturado
    );
  }
}
