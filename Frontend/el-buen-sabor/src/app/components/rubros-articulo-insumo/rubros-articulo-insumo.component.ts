import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { RubroArticuloInsumo } from 'src/app/models/rubro-articulo-insumo';
import { RubroArticuloInsumoService } from 'src/app/services/rubro-articulo-insumo.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-rubro-articulos-insumo',
  templateUrl: './rubros-articulo-insumo.component.html',
  styleUrls: ['./rubros-articulo-insumo.component.css']
})
export class RubrosArticuloInsumoComponent
  extends CommonListarComponent<RubroArticuloInsumo,
  RubroArticuloInsumoService>
  implements OnInit {

  baseEndpoint = BASE_ENDPOINT + '/rubros-articulo-insumo'

  constructor(service: RubroArticuloInsumoService) {
    super(service);
    this.titulo = 'Listado de Rubros para los Artículos Insumo';
    this.nombreModelo = RubroArticuloInsumo.name;
  }

}
