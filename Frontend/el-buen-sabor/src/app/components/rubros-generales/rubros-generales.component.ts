import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { RubroGeneral } from 'src/app/models/rubro-general';
import { RubroGeneralService } from 'src/app/services/rubro-general.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-rubros-generales',
  templateUrl: './rubros-generales.component.html',
  styleUrls: ['./rubros-generales.component.css'],
})
export class RubrosGeneralesComponent
  extends CommonListarComponent<RubroGeneral, RubroGeneralService>
  implements OnInit
{
  baseEndpoint = BASE_ENDPOINT + '/rubros-generales';

  constructor(service: RubroGeneralService) {
    super(service);
    this.titulo = 'Listado de Rubros Artículos Manufacturados';
    this.nombreModelo = RubroGeneral.name;
  }
}
