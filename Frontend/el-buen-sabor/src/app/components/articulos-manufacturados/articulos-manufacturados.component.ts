import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { ArticuloManufacturado } from 'src/app/models/articulo-manufacturado';
import { ArticuloManufacturadoService } from 'src/app/services/articulo-manufacturado.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-articulos-manufacturados',
  templateUrl: './articulos-manufacturados.component.html',
  styleUrls: ['./articulos-manufacturados.component.css'],
})
export class ArticulosManufacturadosComponent
  extends CommonListarComponent<
    ArticuloManufacturado,
    ArticuloManufacturadoService
  >
  implements OnInit
{
  baseEndpoint = BASE_ENDPOINT + '/articulos-manufacturados';

  constructor(service: ArticuloManufacturadoService) {
    super(service);
    this.titulo = 'Listado de Artículos Manufacturados';
    this.nombreModelo = ArticuloManufacturado.name;
  }
}
