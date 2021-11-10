import { Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonFormComponent<
  E extends Generic,
  S extends CommonService<E>
> implements OnInit
{
  titulo: string;
  model: E;
  error: any;
  protected nombreModelo: string;
  protected denominacionEntidad: string;
  protected redirect: string;

  constructor(
    protected service: S,
    protected router: Router,
    protected route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.service.ver(id).subscribe((entity) => {
          this.nombrarEntidad(entity);
          this.titulo = `Editar ${this.nombreModelo}: ${this.denominacionEntidad}`;
          this.model = entity;
        });
      }
    });
  }

  public crear(): void {
    this.service.crear(this.model).subscribe(
      (entity) => {
        this.nombrarEntidad(entity);
        Swal.fire(
          'Nuevo:',
          `${this.nombreModelo} * ${this.denominacionEntidad} * creado con éxito`,
          'success'
        );
        this.router.navigate([this.redirect]);
      },
      (err) => {
        if (err.status == 400) {
          if (
            typeof err.error == 'string' &&
            err.error.includes('ConstraintViolationException')
          ) {
            console.log(
              'Desde common-form / Sin foto :: ERROR: ==> ',
              err.error
            );
            this.error = {
              denominacionUnique:
                'El valor ingresado ya existe en nuestro sistema.',
            };
          } else {
            this.error = err.error;
            console.log(
              'ELSE: Desde common-form / Sin foto :: ERROR: ==> ',
              this.error
            );
          }
        }
      }
    );
  }

  public editar(): void {
    this.service.editar(this.model).subscribe(
      (entity) => {
        this.nombrarEntidad(entity);
        Swal.fire(
          'Modificado',
          `${this.nombreModelo} * ${this.denominacionEntidad} * actualizado con éxito`,
          'success'
        );
        this.router.navigate([this.redirect]);
      },
      (err) => {
        if (err.status == 400) {
          if (
            typeof err.error == 'string' &&
            err.error.includes('ConstraintViolationException')
          ) {
            this.error = {
              nombreUnique: 'El valor ingresado ya existe en nuestro sistema.',
            };
          } else {
            this.error = err.error;
            console.log(this.error);
          }
        }
      }
    );
  }

  // metodo para nombrar la entidad dentro del modal de SweetAlert
  protected nombrarEntidad(entity: E): void {
    if (entity.denominacion) {
      this.denominacionEntidad = entity.denominacion;
    } else if (entity.nombre) {
      this.denominacionEntidad = entity.nombre;
    }
  }
}
