import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-carro-compra',
  templateUrl: './carro-compra.component.html',
  styleUrls: ['./carro-compra.component.css'],
})
export class CarroCompraComponent implements OnInit {
  items: any[];
  // baseEndpointArtManuf = BASE_ENDPOINT + '/articulos-manufacturados';
  baseEndpoint = BASE_ENDPOINT + '/articulos-manufacturados';
  // baseEndpointBebidas = BASE_ENDPOINT + '/articulos-insumo';

  constructor(private _localStorageService: LocalStorageService) {
    this.items = [];
  }

  ngOnInit(): void {
    this.items = this._localStorageService.loadInfo().carroCompraItems;
  }
}
