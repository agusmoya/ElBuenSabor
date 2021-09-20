import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RubroArticuloInsumo } from 'src/app/models/rubro-articulo-insumo';
import { RubroArticuloInsumoService } from 'src/app/services/rubro-articulo-insumo.service';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-rubros-articulo-insumo-form',
  templateUrl: './rubros-articulo-insumo-form.component.html',
  styleUrls: ['./rubros-articulo-insumo-form.component.css']
})
export class RubrosArticuloInsumoFormComponent
  extends CommonFormComponent
  <RubroArticuloInsumo, RubroArticuloInsumoService>
  implements OnInit {

  rubrosArtInsPadres: RubroArticuloInsumo[];
  rubrosArtInsHijos: RubroArticuloInsumo[];

  noPoseeRubroPadre: any;  

  constructor(
    service: RubroArticuloInsumoService,
    router: Router,
    route: ActivatedRoute) {
    super(service, router, route);
    this.titulo = 'Crear Nuevo Rubro';
    this.model = new RubroArticuloInsumo();
    this.redirect = '/rubros-articulo-insumo';
    this.nombreModelo = RubroArticuloInsumo.name;
    this.rubrosArtInsPadres = [];
    this.rubrosArtInsHijos = [];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findAllRubrosArticulosInsumoPadres();
  }

  public findAllRubrosArticulosInsumoPadres(): void {
    this.service.findAllRubrosArticulosInsumo()
      .subscribe(rubrosArtsInsumos => {
        this.rubrosArtInsPadres = rubrosArtsInsumos.filter(r => !r.rubroPadre);
    });
  }

  compararRubro(
    rubro1: RubroArticuloInsumo,
    rubro2: RubroArticuloInsumo
  ): boolean {
    if (rubro1 === undefined && rubro2 === undefined) {
      return true;
    }

    if (
      rubro1 === null ||
      rubro2 === null ||
      rubro1 === undefined ||
      rubro2 === undefined
    ) {
      return false;
    }

    if (rubro1.id === rubro2.id) {
      return true;
    }
  }
}
