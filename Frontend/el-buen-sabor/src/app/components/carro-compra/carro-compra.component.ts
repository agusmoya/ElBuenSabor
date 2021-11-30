import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Location } from '@angular/common';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { MendozaService } from 'src/app/services/mendoza.service';
import { DetallePedido } from 'src/app/models/detalle-pedido';
import { Pedido } from 'src/app/models/pedido';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloInsumoService } from 'src/app/services/articulo-insumo.service';
import { ArticuloInsumo } from 'src/app/models/articulo-insumo';
import { EstadoPedido } from 'src/app/models/estado-pedido';
import { Factura } from 'src/app/models/factura';
import { DetalleFactura } from 'src/app/models/detalle-factura';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carro-compra',
  templateUrl: './carro-compra.component.html',
  styleUrls: ['./carro-compra.component.css'],
})
export class CarroCompraComponent implements OnInit {
  itemsCarroCompra: any[];
  total: number;
  baseEndpointArtManuf: string;
  baseEndpointBebida: string;
  userLoggedInfo$: any;
  ultimoNroPedido: number;
  tipoRetiro: string;
  metodoPago: string;
  cliente: Cliente;
  departamentos: any[];
  localidades: any[];
  cocinerosDisponibles: any[];
  pedidosEnCocina: Pedido[];
  pedido: Pedido;
  horarioAtencion: Date;

  constructor(
    private location: Location,
    private router: Router,
    protected route: ActivatedRoute,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private artInsumoService: ArticuloInsumoService,
    private mendozaService: MendozaService,
    private _localStorageService: LocalStorageService
  ) {
    this.baseEndpointArtManuf = BASE_ENDPOINT + '/articulos-manufacturados';
    this.baseEndpointBebida = BASE_ENDPOINT + '/articulos-insumo';
    this.userLoggedInfo$ = this._localStorageService.userLogged$;
    this.itemsCarroCompra = [];
    this.total = 0;
    this.tipoRetiro = '';
    this.metodoPago = '';
    this.departamentos = [];
    this.localidades = [];
    this.cocinerosDisponibles = [];
    this.pedidosEnCocina = [];
    this.horarioAtencion = new Date();
  }

  ngOnInit(): void {
    this.obtenerUltimoNroPedido();
    this.route.queryParams.subscribe((params) => {
      const externalReference: string = params['external_reference'];
      if (externalReference) {
        this.pedidoService
          .ver(Number(externalReference))
          .subscribe((pedidoObtenido) => {
            this.pedido = pedidoObtenido;
            this.comprobarEstadoPago();
          });
      }
    });

    this.obtenerItemsCarroCompra();
    this.verCliente();
    this.listarDepartamentosMendoza();
    this.listarLocalidadesMendoza();
    this.obtenerCocinerosDisponibles();
    this.obtenerPedidosEnCocina();
  }

  verCliente(): void {
    const emailUser = this._localStorageService.loadInfo().email;
    this.clienteService.buscarPorEmail(emailUser).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  listarDepartamentosMendoza(): void {
    setTimeout(() => {
      this.mendozaService
        .getAllDepartamentos()
        .subscribe((departamentosAPI) => {
          this.departamentos = departamentosAPI.departamentos.filter(
            (d) =>
              d.nombre == 'Guaymallén' ||
              d.nombre == 'Godoy Cruz' ||
              d.nombre == 'Capital' ||
              d.nombre == 'Maipú'
          );
        });
    }, 500);
  }

  listarLocalidadesMendoza(): void {
    setTimeout(() => {
      this.mendozaService
        .getLocalidadesXdepartamento(
          this.cliente?.domicilio.localidad.departamento.nombre
        )
        .subscribe((localidadesAPI) => {
          this.localidades = localidadesAPI.localidades;
        });
    }, 500);
  }

  modificarLocalidad(event: any): void {
    // console.log(event.target.value);
  }

  asignarDpto(event: any): void {
    this.cliente.domicilio.localidad.departamento.nombre = event.target.value;
    this.cliente.domicilio.localidad.departamento.provincia.nombre = 'Mendoza';
    this.mendozaService
      .getLocalidadesXdepartamento(event.target.value)
      .subscribe((localidadesAPI) => {
        this.localidades = localidadesAPI.localidades;
      });
  }

  asignarLocalidad(event: any): void {
    this.cliente.domicilio.localidad.nombre = event.target.value;
  }

  tieneTipoRetiro(): void {
    // console.log(this.tipoRetiro);
  }

  tieneMetodoPago(): void {
    // console.log(this.metodoPago);
  }

  verificarCantidad(item: any): void {
    this._localStorageService.addItem({
      product: item.product,
      quantity: item.quantity,
    });
  }

  eliminarItem(item: any, indice: any): void {
    this._localStorageService.removeItem(item, indice);
    this.total -= item.product.precioVenta * item.quantity;
  }

  validarPedidoHorariosAtencion(): boolean {
    const daysNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    if (
      ((daysNames[this.horarioAtencion.getDay()] === 'Monday' ||
        daysNames[this.horarioAtencion.getDay()] === 'Tuesday' ||
        daysNames[this.horarioAtencion.getDay()] === 'Wednesday' ||
        daysNames[this.horarioAtencion.getDay()] === 'Thursday' ||
        daysNames[this.horarioAtencion.getDay()] === 'Friday') &&
        this.horarioAtencion.getHours() < 20) ||
      this.horarioAtencion.getHours() > 0 ||
      ((daysNames[this.horarioAtencion.getDay()] === 'Sunday' ||
        daysNames[this.horarioAtencion.getDay()] === 'Saturday') &&
        this.horarioAtencion.getHours() < 11) ||
      this.horarioAtencion.getHours() > 15 ||
      this.horarioAtencion.getHours() < 20 ||
      this.horarioAtencion.getHours() > 0
    ) {
      Swal.fire(
        'Atención:',
        'Los pedidos se encuentras deshabilitados hasta el inicio del horario de atención: Lunes a Domingos de 20:00 a 00:00 hs. Sábados y Domingos de 11:00 a 15:00 hs y de 20:00 a 00:00 hs.',
        'warning'
      );
      return false;
    }
    return true;
  }

  crearPedido(): void {
    // if (!this.validarPedidoHorariosAtencion()) {
    //   return;
    // }
    this.pedido = new Pedido();
    this.obtenerUltimoNroPedido();
    this.pedido.numero = this.ultimoNroPedido;
    this.itemsCarroCompra.forEach((item) => {
      this.cargarDetallesDePedido(this.pedido, item);
    });

    this.pedido.cliente = this.cliente;
    this.pedido.domicilio = this.cliente.domicilio;
    this.pedido.fecha = new Date();
    this.pedido.horaEstimadaFin = new Date();
    // 0 --> local | 1 --> domicilio
    this.pedido.tipoEnvio = this.tipoRetiro == 'local' ? 0 : 1;

    // Este cálculo lo realizamos cuando el cajero aprueba el pedido.
    // Lo muevo al componente pedido
    this.pedido.horaEstimadaFin.setMinutes(
      this.pedido.fecha.getMinutes() +
        this.calcularHoraEstimadaPedido(this.pedido)
    );

    this.pedido.estadosPedido.push(
      new EstadoPedido(EstadoPedido.status.Pendiente)
    );
    this.pedidoService.crear(this.pedido).subscribe((pedido) => {
      if (this.metodoPago === 'mercadoPago') {
        this.pedidoService.crearPreferencia(pedido).subscribe((preference) => {
          // RTA desde endpoint "/createAndRedirect"
          console.log('** PREFERENCE: ', preference);
          window.location.href = preference.initPoint;
        });
      } else {
        Swal.fire(
          '¡Gracias por su Compra!',
          `El pago ha sido cargado.`,
          'success'
        );
        this.decrementarStock();
        this.vaciarCarroCompras();
      }
    });
    console.log('** Pedido: ', this.pedido);
  }

  obtenerUltimoNroPedido(): void {
    this.pedidoService.obtenerUltimoNroPedido().subscribe((nro) => {
      this.ultimoNroPedido = nro + 1;
    });
  }

  crearFacturaDePedido(pedidoAfacturar: Pedido): void {
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
      let detalleFactura = new DetalleFactura();

      detalleFactura.cantidad = detallePedido.cantidad;
      detalleFactura.subtotal = detallePedido.subtotal;
      detalleFactura.articuloManufacturado =
        detallePedido.articuloManufacturado;
      detalleFactura.articuloInsumo = detallePedido.articuloInsumo;

      pedidoAfacturar.factura.detallesFactura.push(detalleFactura);
    });

    this.pedido.estadosPedido.push(
      new EstadoPedido(EstadoPedido.status.Facturado)
    );
  }

  obtenerItemsCarroCompra(): void {
    this.userLoggedInfo$.subscribe((user) => {
      user ? (this.itemsCarroCompra = user.carroCompraItems) : '';
    });
    this.itemsCarroCompra.forEach((item) => {
      this.total += item.product.precioVenta * item.quantity;
    });
  }

  cargarDetallesDePedido(pedido: Pedido, item: any): void {
    const detalle = new DetallePedido();
    detalle.cantidad = item.quantity;
    detalle.subtotal = item.product.precioVenta * item.quantity;

    if (
      item.product.esInsumo !== undefined &&
      item.product.esInsumo === false
    ) {
      detalle.articuloInsumo = item.product;
    } else {
      detalle.articuloManufacturado = item.product;
    }
    pedido.detallesPedido.push(detalle);
  }

  calcularHoraEstimadaPedido(pedido: Pedido): number {
    let totalTiempoEstimadoPedidoActual: number = 0;

    let tiempoEstimadoArticulosSolicitados: number =
      this.calcularTiempoEstimadoDeArticulosSolicitados(pedido);

    let tiempoEstimadoDePedidosEnCocina =
      this.obtenerTiempoEstimadoDePedidosEnCocina();

    if (this.cocinerosDisponibles.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡No hay Cocineros disponibles!',
      });
    } else {
      totalTiempoEstimadoPedidoActual =
        tiempoEstimadoArticulosSolicitados +
        tiempoEstimadoDePedidosEnCocina / this.cocinerosDisponibles.length;

      if (pedido.tipoEnvio === 1) {
        totalTiempoEstimadoPedidoActual += 10;
        console.log(
          '** Adicional por envío a  Domicilio:',
          totalTiempoEstimadoPedidoActual
        );
      }
    }

    return totalTiempoEstimadoPedidoActual;
  }

  calcularTiempoEstimadoDeArticulosSolicitados(pedido: Pedido): number {
    let tiempoEstimado = 0;
    pedido.detallesPedido.forEach((detalle) => {
      if (
        detalle.articuloManufacturado &&
        detalle.articuloManufacturado.tiempoEstimadoCocina
      ) {
        tiempoEstimado += detalle.articuloManufacturado.tiempoEstimadoCocina;
      }
    });
    console.log('Tiempo estimado Art. Solicitados: ', tiempoEstimado);

    return tiempoEstimado;
  }

  obtenerPedidosEnCocina(): void {
    this.pedidoService.listar().subscribe((pedidos) => {
      this.pedidosEnCocina = pedidos.filter(
        (pedido) =>
          pedido.estadosPedido.length == 2 &&
          pedido.estadosPedido[1].denominacion == 'APROBADO'
      );
    });
  }

  obtenerTiempoEstimadoDePedidosEnCocina(): number {
    let tiempoEstimado = 0;

    if (this.pedidosEnCocina.length > 0) {
      this.pedidosEnCocina.forEach((pedido) => {
        pedido.detallesPedido.forEach((detalle) => {
          if (
            detalle.articuloManufacturado &&
            detalle.articuloManufacturado.tiempoEstimadoCocina
          ) {
            tiempoEstimado +=
              detalle.articuloManufacturado.tiempoEstimadoCocina;
          }
        });
      });
    }
    console.log('Tiempo estimado Pedidos en cocina: ', tiempoEstimado);
    return tiempoEstimado;
  }

  obtenerCocinerosDisponibles(): void {
    this.usuarioService.listar().subscribe((usuarios) => {
      usuarios.forEach((user) => {
        if (
          user.estado == 1 &&
          user.rol.estado == 1 &&
          user.rol.denominacion == 'Cocinero'
        ) {
          this.cocinerosDisponibles.push(user);
        }
      });
    });
  }

  comprobarEstadoPago(): void {
    this.route.queryParams.subscribe((params) => {
      const status: string = params['status'];
      if (status && status == 'approved') {
        Swal.fire(
          'Pago Aprobado:',
          `El pago se ha realizado con éxito.`,
          'success'
        );
        console.log('COMPROBAR ESTADO PAGO:', this.pedido);
        this.pedido
          ? this.decrementarStock()
          : console.log('**PEDIDO ES NULO!**');
        // this.vaciarCarroCompras();
      } else if (status && status == 'failure') {
        Swal.fire('Pago Falló:', `El pago no ha podido realizarse.`, 'error');
      } else if (status && status == 'pending') {
        Swal.fire(
          'Pago Pendiente:',
          `El pago ha quedado pendiente.`,
          'warning'
        );
      }
    });
  }

  decrementarStock(): void {
    console.log('DECREMENTAR STOCK:', this.pedido);

    this.pedido.detallesPedido.forEach((detallePedido) => {
      if (
        detallePedido.articuloInsumo != undefined &&
        detallePedido.articuloInsumo.esInsumo == false
      ) {
        // bebidas con stock en unidades
        detallePedido.articuloInsumo.stockActual -= detallePedido.cantidad;
        this.actualizarDecrementoStockArtInsumo(detallePedido.articuloInsumo);
      } else {
        detallePedido.articuloManufacturado.detallesArticuloManufacturado.forEach(
          (detalleArtManuf) => {
            detalleArtManuf.articuloInsumo.stockActual -=
              detalleArtManuf.cantidad * detallePedido.cantidad;
            this.actualizarDecrementoStockArtInsumo(
              detalleArtManuf.articuloInsumo
            );
          }
        );
      }
    });
    // this.crearFacturaDePedido(this.pedido);
    this.vaciarCarroCompras();
  }

  actualizarDecrementoStockArtInsumo(artInsumo: ArticuloInsumo): void {
    this.artInsumoService
      .editar(artInsumo)
      .subscribe((artInsumo) => console.log(artInsumo));
  }

  vaciarCarroCompras(): void {
    this._localStorageService.cleanShoppinCart();
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.location.back();
  }
}
