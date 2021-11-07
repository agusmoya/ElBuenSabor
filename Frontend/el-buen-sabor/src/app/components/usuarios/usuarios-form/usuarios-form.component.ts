import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CommonFormComponent } from '../../common-form.component';
import { Location } from '@angular/common';
import { Cliente } from 'src/app/models/cliente';
import { MendozaService } from 'src/app/services/mendoza.service';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

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
  roles: Rol[];
  departamentos: any[];
  localidades: any[];
  cliente: Cliente;

  constructor(
    service: UsuarioService,
    private location: Location,
    private rolService: RolService,
    private clienteService: ClienteService,
    private mendozaService: MendozaService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(service, router, route);
    this.titulo = 'Registración de Usuario';
    this.model = new Usuario();
    this.redirect = '/usuarios';
    this.nombreModelo = Usuario.name;
    this.roles = [];
    this.departamentos = [];
    this.localidades = [];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.listarRoles();
  }

  listarRoles(): void {
    this.rolService.listar().subscribe((roles) => {
      this.roles = roles;
      this.verificarClienteDeUsuario();
      this.listarDepartamentosMendoza();
    });
  }

  asignarRol(event: any): void {
    if (event.target.value != 'null') {
      this.rolService.ver(event.target.value).subscribe((rol) => {
        this.model.rol = rol;
        if (
          this.model.rol.denominacion == 'Cliente' ||
          this.model.rol.denominacion == 'Administrador'
        ) {
          this.verificarClienteDeUsuario();
        }
      });
    }
  }

  verificarClienteDeUsuario(): void {
    if (
      this.model.id &&
      (this.model.rol.denominacion == 'Cliente' ||
        this.model.rol.denominacion == 'Administrador')
    ) {
      this.clienteService
        .buscarPorEmail(this.model.nombre)
        .subscribe((cliente) => {
          this.cliente = cliente;
          this.listarLocalidadesMendoza();
          console.log('** CLIENTE ENCONTRADO: ', this.cliente);
        });
    } else if (
      !this.model.id &&
      this.model.rol &&
      (this.model.rol.denominacion == 'Cliente' ||
        this.model.rol.denominacion == 'Administrador')
    ) {
      this.cliente = new Cliente();
      this.cliente.email = this.model.nombre;
      this.cliente.usuario = this.model;
      console.log('** CLIENTE NUEVO: ', this.cliente);
    }
  }

  listarDepartamentosMendoza(): void {
    this.mendozaService.getAllDepartamentos().subscribe((departamentosAPI) => {
      this.departamentos = departamentosAPI.departamentos.filter(
        (d) =>
          d.nombre == 'Guaymallén' ||
          d.nombre == 'Godoy Cruz' ||
          d.nombre == 'Capital' ||
          d.nombre == 'Maipú'
      );
    });
  }

  listarLocalidadesMendoza(): void {
    if (this.cliente?.domicilio.localidad.departamento != null) {
      this.mendozaService
        .getLocalidadesXdepartamento(
          this.cliente.domicilio.localidad.departamento.nombre
        )
        .subscribe((localidadesAPI) => {
          this.localidades = localidadesAPI.localidades;
        });
    }
  }

  asignarDpto(event: any): void {
    this.cliente.domicilio.localidad.departamento.nombre = event.target.value;
    this.cliente.domicilio.localidad.departamento.provincia.nombre = 'Mendoza';
    this.mendozaService
      .getLocalidadesXdepartamento(event.target.value)
      .subscribe((localidadesAPI) => {
        this.localidades = localidadesAPI.localidades;
      });
  }

  asignarLocalidad(event: any): void {
    this.cliente.domicilio.localidad.nombre = event.target.value;
    console.log(this.cliente);
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

  // public crear(): void {
  //   if (!this.fotoSeleccionada) {
  //     super.crear();
  //     if (
  //       this.model.rol.denominacion == 'Cliente' ||
  //       this.model.rol.denominacion == 'Administrador'
  //     ) {
  //       setTimeout(() => {
  //         this.crearCliente();
  //       }, 500);
  //     }
  //   } else {
  //     this.service.crearConFoto(this.model, this.fotoSeleccionada).subscribe(
  //       (usuario) => {
  //         // metodo para nombrar la entidad a crear, dentro del modal de SweetAlert
  //         this.nombrarEntidad(usuario);
  //         Swal.fire(
  //           'Nuevo:',
  //           `${this.nombreModelo} * ${this.denominacionEntidad} * creado con éxito`,
  //           'success'
  //         );
  //         if (
  //           this.model.rol.denominacion == 'Cliente' ||
  //           this.model.rol.denominacion == 'Administrador'
  //         ) {
  //           setTimeout(() => {
  //             this.crearCliente();
  //           }, 500);
  //         }
  //         this.router.navigate([this.redirect]);
  //       },
  //       (err) => {
  //         if (err.status === 400) {
  //           this.error = err.error;
  //           console.log('Error XXX', this.error);
  //         }
  //       }
  //     );
  //   }
  // }

  // crear para sobreescribir al del padre

  crearUsuario(): void {
    if (
      this.model.rol.denominacion == 'Cliente' ||
      this.model.rol.denominacion == 'Administrador'
    ) {
      this.crearCliente();
    } else {
      if (!this.fotoSeleccionada) {
        super.crear();
      } else {
        this.service.crearConFoto(this.model, this.fotoSeleccionada).subscribe(
          (usuarioCreado) => {
            this.nombrarEntidad(usuarioCreado);
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
                this.error = {
                  nombreUnique:
                    'El valor ingresado ya existe en nuestro sistema.',
                };
                this.error = err.error;
                console.log('Error XXX', this.error);
              }
            }
          }
        );
      }
    }
  }

  // editar
  editarUsuario(): void {
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
        if (err.status === 400) {
          this.error = err.error;
          console.log(this.error);
        }
      }
    );
  }

  public editar(): void {
    if (!this.fotoSeleccionada) {
      if (
        this.model.rol.denominacion == 'Cliente' ||
        this.model.rol.denominacion == 'Administrador'
      ) {
        setTimeout(() => {
          this.editarCliente();
        }, 500);
      }
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
          if (
            this.model.rol.denominacion == 'Cliente' ||
            this.model.rol.denominacion == 'Administrador'
          ) {
            setTimeout(() => {
              this.editarCliente();
            }, 500);
          }
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

  // FUNCIONANDO
  public crearCliente(): void {
    if (!this.fotoSeleccionada) {
      this.clienteService.crear(this.cliente).subscribe(
        (cliente) => {
          console.log(cliente);
          this.router.navigate([this.redirect]);
        },
        (err) => {
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
          }
        }
      );
    } else {
      this.clienteService
        .crearConFoto(this.cliente, this.fotoSeleccionada)
        .subscribe(
          (clienteCreado) => {
            this.nombrarEntidadCliente(clienteCreado);
            Swal.fire(
              'Nuevo:',
              `${this.nombreModelo} * ${this.denominacionEntidad} * creado con éxito`,
              'success'
            );
            this.router.navigate([this.redirect]);
          },
          (err) => {
            if (err.status == 400) {
              this.error = err.error;
              console.log(this.error);
            }
          }
        );
    }
  }

  public editarCliente(): void {
    this.service.buscarPorEmail(this.model.nombre).subscribe(
      (usuario) => {
        // console.log('Usuario mail:', this.model.nombre);
        this.cliente.email = this.model.nombre;
        // console.log('Usuario encontrado sin cliente:', usuario);
        this.cliente.usuario = usuario;
        this.clienteService.editar(this.cliente).subscribe(
          (cliente) => console.log(cliente),
          (err) => {
            if (err.status === 400) {
              this.error = err.error;
              console.log(this.error);
            }
          }
        );
      },
      (err) => {
        if (err.status === 400) {
          this.error = err.error;
          console.log(this.error);
        }
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  private nombrarEntidadCliente(cliente: Cliente): void {
    if (cliente.denominacion) {
      this.denominacionEntidad = cliente.denominacion;
    } else if (cliente.nombre) {
      this.denominacionEntidad = cliente.nombre;
    }
  }
}
