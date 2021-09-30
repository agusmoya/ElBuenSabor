import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-carro-compra',
  templateUrl: './carro-compra.component.html',
  styleUrls: ['./carro-compra.component.css'],
})
export class CarroCompraComponent implements OnInit {
  items: any[];
  total: number;
  baseEndpoint = BASE_ENDPOINT + '/articulos-manufacturados';
  userLoggedInfo$ = this._localStorageService.userLogged$;

  constructor(
    private location: Location,
    private _localStorageService: LocalStorageService
  ) {
    this.items = [];
    this.total = 0;
  }

  ngOnInit(): void {
    this.userLoggedInfo$.subscribe((user) => {
      this.items = user.carroCompraItems;
    });
    this.items.forEach((item) => {
      this.total += item.product.precioVenta * item.quantity;
    });
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

  goBack(): void {
    this.location.back();
  }
}
