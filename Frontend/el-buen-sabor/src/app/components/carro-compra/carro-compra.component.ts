import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Location } from '@angular/common';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { MendozaService } from 'src/app/services/mendoza.service';
import { DetallePedido } from 'src/app/models/detalle-pedido';
import { Pedido } from 'src/app/models/pedido';
import { EstadoPedido } from 'src/app/models/estado-pedido';
import { MercadoPagoDatos } from 'src/app/models/mercado-pago-datos';
import { Factura } from 'src/app/models/factura';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PedidoService } from 'src/app/services/pedido.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carro-compra',
  templateUrl: './carro-compra.component.html',
  styleUrls: ['./carro-compra.component.css'],
})
export class CarroCompraComponent implements OnInit {
  itemsCarroCompra: any[];
  total: number;
  baseEndpointArtManuf = BASE_ENDPOINT + '/articulos-manufacturados';
  baseEndpointBebida = BASE_ENDPOINT + '/articulos-insumo';
  userLoggedInfo$ = this._localStorageService.userLogged$;
  tipoRetiro: string;
  metodoPago: string;
  cliente: Cliente;
  departamentos: any[];
  localidades: any[];
  cocinerosDisponibles: any[];
  pedidosEnCocina: Pedido[];

  constructor(
    private location: Location,
    private router: Router,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private mendozaService: MendozaService,
    private _localStorageService: LocalStorageService
  ) {
    this.itemsCarroCompra = [];
    this.total = 0;
    this.tipoRetiro = '';
    this.metodoPago = '';
    this.departamentos = [];
    this.localidades = [];
    this.cocinerosDisponibles = [];
    this.pedidosEnCocina = [];
  }

  ngOnInit(): void {
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

  eliminarItem(item: any): void {
    this._localStorageService.removeItem(item.product.id);
    this.total -= item.product.precioVenta * item.quantity;
  }

  crearPedido(): void {
    const pedido = new Pedido();

    this.itemsCarroCompra.forEach((item) => {
      this.cargarDetallesDePedido(pedido, item);
    });

    pedido.cliente = this.cliente;
    pedido.domicilio = this.cliente.domicilio;
    pedido.fecha = new Date();
    pedido.horaEstimadaFin = new Date();
    // 0 --> local | 1 --> domicilio
    pedido.tipoEnvio = this.tipoRetiro == 'local' ? 0 : 1;
    pedido.horaEstimadaFin.setMinutes(
      pedido.fecha.getMinutes() + this.calcularHoraEstimadaPedido(pedido)
    );
    pedido.estadosPedido.push(new EstadoPedido(EstadoPedido.status.Pendiente));

    if (this.metodoPago === 'mercadoPago') {
      // pedido.mercadoPagoDatos = new MercadoPagoDatos();
      this.pedidoService.crearPreferencia(pedido).subscribe((preference) => {
        // console.log(preference.sandboxInitPoint);
        window.location.href = preference.sandboxInitPoint;
      });
    }

    // pedido.factura = new Factura();
    console.log('** Pedido: ', pedido);
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
      // console.log('*** Art. Insumo: ', item.producto);
    } else {
      detalle.articuloManufacturado = item.product;
      // console.log('*** Art. Manuf: ', item.producto);
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

      // pedido.tipoEnvio === 1 ? (totalTiempoEstimadoPedidoActual += 10) : 0;
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
          tiempoEstimado += detalle.articuloManufacturado.tiempoEstimadoCocina;
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

  goBack(): void {
    this.location.back();
  }
}
