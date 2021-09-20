import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../../common-form.component';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.css'],
})
export class RolesFormComponent
  extends CommonFormComponent<Rol, RolService>
  implements OnInit
{
  private fotoSeleccionada: File;
  rolForm: FormGroup;

  constructor(service: RolService, router: Router, route: ActivatedRoute) {
    super(service, router, route);
    this.titulo = 'Crear Nuevo Rol';
    this.model = new Rol();
    this.redirect = '/roles';
    this.nombreModelo = Rol.name;
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
          // metodo para nombrar la entidad a crear, dentro del modal de SweetAlert
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
          // metodo para nombrar la entidad a crear, dentro del modal de SweetAlert
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
