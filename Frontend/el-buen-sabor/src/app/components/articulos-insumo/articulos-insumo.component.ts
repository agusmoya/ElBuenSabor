import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { ArticuloInsumo } from 'src/app/models/articulo-insumo';
import { RubroArticuloInsumo } from 'src/app/models/rubro-articulo-insumo';
import { ArticuloInsumoService } from 'src/app/services/articulo-insumo.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-articulos-insumo',
  templateUrl: './articulos-insumo.component.html',
  styleUrls: ['./articulos-insumo.component.css']
})
export class ArticulosInsumoComponent
  extends CommonListarComponent<ArticuloInsumo, ArticuloInsumoService>
  implements OnInit {

  baseEndpoint = BASE_ENDPOINT + '/articulos-insumo'

  constructor(service: ArticuloInsumoService) {
    super(service);
    this.titulo = 'Listado de Artículos Insumo';
    this.nombreModelo = ArticuloInsumo.name;
  }



}
