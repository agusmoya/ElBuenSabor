import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloInsumo } from 'src/app/models/articulo-insumo';
import { RubroArticuloInsumo } from 'src/app/models/rubro-articulo-insumo';
import { ArticuloInsumoService } from 'src/app/services/articulo-insumo.service';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-articulos-insumo-form',
  templateUrl: './articulos-insumo-form.component.html',
  styleUrls: ['./articulos-insumo-form.component.css'],
})
export class ArticulosInsumoFormComponent
  extends CommonFormComponent<ArticuloInsumo, ArticuloInsumoService>
  implements OnInit
{
  private fotoSeleccionada: File;
  rubrosHijos: RubroArticuloInsumo[];
  rubrosPadres: RubroArticuloInsumo[];

  constructor(
    service: ArticuloInsumoService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, router, route);
    this.titulo = 'Crear Nuevo Artículo Insumo';
    this.model = new ArticuloInsumo();
    this.redirect = '/articulos-insumo';
    this.nombreModelo = ArticuloInsumo.name;
    this.rubrosHijos = [];
    this.rubrosPadres = [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.service.ver(id).subscribe((entity) => {
          this.nombrarEntidad(entity);
          this.titulo = `Editar ${this.nombreModelo}: ${this.denominacionEntidad}`;
          this.model = entity;
          this.cargarHijos();
        });
      }
    });
    this.findAllRubrosArticulosInsumoPadres();
  }

  public findAllRubrosArticulosInsumoPadres(): void {
    this.service
      .findAllRubrosArticulosInsumo()
      .subscribe((rubrosArtsInsumos) => {
        // filtramos por aquellos rubros raíz (que no tengan Padre)
        this.rubrosPadres = rubrosArtsInsumos.filter((r) => !r.rubroPadre);
      });
  }

  cargarHijos(): void {
    this.rubrosHijos = this.model.rubroPadre
      ? this.model.rubroPadre.rubrosHijos
      : [];
  }

  // rubro1: corresponde a cada una de las listas select, para comparar con rubro2, que corresponde
  // al rubro que tiene seleccionado el articulo-insumo (ya sea hijo o padre)
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

  public seleccinarFoto(event: any): void {
    this.fotoSeleccionada = event.target.files[0];
    if (
      this.fotoSeleccionada &&
      this.fotoSeleccionada.type.indexOf('image') < 0
    ) {
      Swal.fire(
        'Error al seleccionar la imagen:',
        `Archivo del tipo ${this.fotoSeleccionada.type}. El archivo debe ser del tipo *imagen*`,
        'error'
      );
      this.fotoSeleccionada = null;
    } else if (this.fotoSeleccionada && this.fotoSeleccionada.size > 5000000) {
      Swal.fire(
        'Error al seleccionar la imagen:',
        `El archivo pesa demasiado: ${(this.fotoSeleccionada.size / 1000000)
          .valueOf()
          .toFixed(2)}mb. Max: 5 mb`,
        'error'
      );
      this.fotoSeleccionada = null;
    }
  }

  public crear(): void {
    if (!this.fotoSeleccionada) {
      super.crear();
    } else {
      this.service.crearConFoto(this.model, this.fotoSeleccionada).subscribe(
        (rol) => {
          this.nombrarEntidad(rol);
          Swal.fire(
            'Nuevo:',
            `${this.nombreModelo} * ${this.denominacionEntidad} * creado con éxito`,
            'success'
          );
          this.router.navigate([this.redirect]);
        },
        (err) => {
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
          }
        }
      );
    }
  }

  public editar(): void {
    if (!this.fotoSeleccionada) {
      super.editar();
    } else {
      this.service.editarConFoto(this.model, this.fotoSeleccionada).subscribe(
        (rol) => {
          this.nombrarEntidad(rol);
          Swal.fire(
            'Modificado:',
            `${this.nombreModelo} * ${this.denominacionEntidad} * actualizado con éxito`,
            'success'
          );
          this.router.navigate([this.redirect]);
        },
        (err) => {
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
          }
        }
      );
    }
  }
}

// this.service.findAllRubrosArticulosInsumo().subscribe((rubros) => {
//   this.rubrosHijos = rubros.filter(
//     (rubro) =>
//       rubro.rubroPadre &&
//       rubro.rubroPadre.id === this.model.rubroPadre.id
//   );
// });
