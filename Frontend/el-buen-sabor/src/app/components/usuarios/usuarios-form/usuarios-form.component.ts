import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { CommonFormComponent } from '../../common-form.component';

import { Location } from '@angular/common';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css'],
})
export class UsuariosFormComponent
  extends CommonFormComponent<Usuario, UsuarioService>
  implements OnInit
{
  private fotoSeleccionada: File;
  roles: Rol[] = [];

  cliente: Cliente;

  constructor(
    private location: Location,
    service: UsuarioService,
    private rolService: RolService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, router, route);
    this.titulo = 'Registración de Usuario';
    this.model = new Usuario();
    this.redirect = '/usuarios';
    this.nombreModelo = Usuario.name;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.rolService.listar().subscribe((roles) => (this.roles = roles));
  }

  public seleccionarRol(event: any): void {
    if (event.target.value != 'null') {
      this.rolService.ver(event.target.value).subscribe((rol) => {
        this.model.rol = rol;
        if (this.model.rol.denominacion == 'Cliente') {
          this.cliente = new Cliente();
        } else {
        }
      });
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
        (usuario) => {
          // metodo para nombrar la entidad a crear, dentro del modal de SweetAlert
          this.nombrarEntidad(usuario);
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
            console.log('Error XXX', this.error);
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
        (usuario) => {
          // metodo para nombrar la entidad a crear, dentro del modal de SweetAlert
          this.nombrarEntidad(usuario);
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

  goBack(): void {
    this.location.back();
  }
}
