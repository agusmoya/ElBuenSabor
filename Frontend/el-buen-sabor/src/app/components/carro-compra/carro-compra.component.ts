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

@Component({
  selector: 'app-carro-compra',
  templateUrl: './carro-compra.component.html',
  styleUrls: ['./carro-compra.component.css'],
})
export class CarroCompraComponent implements OnInit {
  items: any[];
  total: number;
  baseEndpointArtManuf = BASE_ENDPOINT + '/articulos-manufacturados';
  baseEndpointBebida = BASE_ENDPOINT + '/articulos-insumo';
  userLoggedInfo$ = this._localStorageService.userLogged$;
  tipoRetiro: string;
  metodoPago: string;
  cliente: Cliente;
  departamentos: any[];
  localidades: any[];

  constructor(
    private location: Location,
    private clienteService: ClienteService,
    private mendozaService: MendozaService,
    private _localStorageService: LocalStorageService
  ) {
    this.items = [];
    this.total = 0;
    this.tipoRetiro = '';
    this.metodoPago = '';
    this.departamentos = [];
    this.localidades = [];
  }

  ngOnInit(): void {
    this.verCliente();
    this.listarDepartamentosMendoza();
    this.listarLocalidadesMendoza();

    this.userLoggedInfo$.subscribe((user) => {
      user ? (this.items = user.carroCompraItems) : [];
    });
    this.items.forEach((item) => {
      this.total += item.product.precioVenta * item.quantity;
    });
  }

  verCliente(): void {
    const emailUser = this._localStorageService.loadInfo().email;
    this.clienteService.buscarPorEmail(emailUser).subscribe((cliente) => {
      this.cliente = cliente;
      console.log(this.cliente);
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
    console.log(event.target.value);
  }

  asignarDpto(event: any): void {
    console.log(event.target.value);
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
    console.log(this.cliente);
  }

  tieneTipoRetiro(): void {
    console.log(this.tipoRetiro);
  }

  tieneMetodoPago(): void {
    console.log(this.metodoPago);
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
    const pedido: Pedido = new Pedido();
    const itemsCarroCompra =
      this._localStorageService.loadInfo().carroCompraItems;

    itemsCarroCompra.forEach((item) => {
      this.cargarDetalleDePedido(pedido, item);
    });

    pedido.cliente = this.cliente;
    pedido.domicilio = this.cliente.domicilio;
    pedido.fecha = new Date();
    pedido.horaEstimadaFin = new Date();
    // pedido.horaEstimadaFin.setMinutes(pedido.fecha.getMinutes()+ 'SUMATORIA');
    pedido.tipoEnvio = this.tipoRetiro == 'local' ? 0 : 1;
    // pedido.mercadoPagoDatos = new MercadoPagoDatos();
    // pedido.factura = new Factura();
    pedido.estadosPedido.push();

    pedido.numero = Pedido.NUMERO++;
  }

  cargarDetalleDePedido(pedido: Pedido, item: any): void {
    const detalle = new DetallePedido();
    detalle.cantidad = item.quantity;
    detalle.subtotal = item.product.precioVenta * item.quantity;

    if (item.product.esInsumo && item.product.esInsumo === false) {
      detalle.articuloInsumo = item.product;
    } else {
      detalle.articuloManufacturado = item.product;
    }
    pedido.detallesPedido.push(detalle);
  }

  goBack(): void {
    this.location.back();
  }
}
