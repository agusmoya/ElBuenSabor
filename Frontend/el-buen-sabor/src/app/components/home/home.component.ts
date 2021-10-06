import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { ArticuloInsumo } from 'src/app/models/articulo-insumo';
import { ArticuloManufacturado } from 'src/app/models/articulo-manufacturado';
import { ArticuloInsumoService } from 'src/app/services/articulo-insumo.service';
import { ArticuloManufacturadoService } from 'src/app/services/articulo-manufacturado.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  baseEndpointArtManuf = BASE_ENDPOINT + '/articulos-manufacturados';
  baseEndpointBebida = BASE_ENDPOINT + '/articulos-insumo';
  arrArtManufacturados: ArticuloManufacturado[];
  arrBebidas: ArticuloInsumo[];

  constructor(
    private serviceArtManuf: ArticuloManufacturadoService,
    private serviceArtInsumo: ArticuloInsumoService
  ) {
    this.arrArtManufacturados = [];
    this.arrBebidas = [];
  }

  ngOnInit(): void {
    this.getArticulosManufacturados();
    this.getBebidas();
  }

  getArticulosManufacturados(): void {
    this.serviceArtManuf
      .listar()
      .subscribe((articulos) => (this.arrArtManufacturados = articulos));
  }

  getBebidas(): void {
    this.serviceArtInsumo.listar().subscribe((articulos) => {
      this.arrBebidas = articulos.filter(
        (articulo) => articulo.esInsumo == false
      );
    });
  }
}
