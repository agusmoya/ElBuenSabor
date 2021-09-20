import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RubroGeneral } from 'src/app/models/rubro-general';
import { RubroGeneralService } from 'src/app/services/rubro-general.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-rubros-generales-form',
  templateUrl: './rubros-generales-form.component.html',
  styleUrls: ['./rubros-generales-form.component.css'],
})
export class RubrosGeneralesFormComponent
  extends CommonFormComponent<RubroGeneral, RubroGeneralService>
  implements OnInit
{
  private fotoSeleccionada: File;

  constructor(
    service: RubroGeneralService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, router, route);
    this.titulo = 'Crear Nuevo Rubro General';
    this.model = new RubroGeneral();
    this.redirect = '/rubros-articulos-manufacturados';
    this.nombreModelo = RubroGeneral.name;
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
        (rubroGeneral) => {
          // metodo para nombrar la entidad a crear, dentro del modal de SweetAlert
          this.nombrarEntidad(rubroGeneral);
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
        (rubroGeneral) => {
          // metodo para nombrar la entidad a crear, dentro del modal de SweetAlert
          this.nombrarEntidad(rubroGeneral);
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
