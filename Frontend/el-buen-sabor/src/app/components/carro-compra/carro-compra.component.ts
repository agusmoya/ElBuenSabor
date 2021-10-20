import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Location } from '@angular/common';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/cliente';
import { MendozaService } from 'src/app/services/mendoza.service';

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

    



  }

  goBack(): void {
    this.location.back();
  }
}
