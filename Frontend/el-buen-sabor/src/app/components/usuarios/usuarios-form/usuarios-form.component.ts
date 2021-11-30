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
    this.redirect = '/usuarios';
    this.roles = [];
    this.departamentos = [];
    this.localidades = [];
    this.model = new Usuario();
    this.nombreModelo = Usuario.name;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listarDepartamentosMendoza();
      this.listarRoles();
      const id: number = Number(params.get('id'));
      if (id) {
        this.service.ver(id).subscribe((entity) => {
          this.nombrarEntidad(entity);
          this.titulo = `Editar ${this.nombreModelo}: ${this.denominacionEntidad}`;
          this.model = entity;
          if (
            this.model.rol.denominacion == 'Cliente' ||
            this.model.rol.denominacion == 'Administrador'
          ) {
            this.verificarClienteDeUsuario();
          }
        });
      }
    });
  }

  listarRoles(): void {
    this.rolService.listar().subscribe((roles) => {
      this.roles = roles;
    });
  }

  asignarRol(event: any, localidad: string = null): void {
    const rolAbuscar = event ? event.target.value : localidad;
    this.rolService.ver(rolAbuscar).subscribe((rol) => {
      this.model.rol = rol;
      if (
        this.model.rol.denominacion != 'Cliente' &&
        this.model.rol.denominacion != 'Administrador'
      ) {
        this.cliente = null;
      } else {
        this.cliente = new Cliente();
        this.listarDepartamentosMendoza();
      }
    });
  }

  // CREAR:
  // crear usuario no-cliente:
  // i this.model.id && this.cliente == null
  //crear usuario-cliente:
  // i this.model.id && i this.cliente.id

  // EDITAR:
  // editar usuario sin un cliente asociado
  // this.model.id && !this.cliente.id
  // editar usuario con un cliente asociado
  // this.model.id && this.cliente.id

  verificarClienteDeUsuario(): void {
    this.clienteService
      .buscarPorEmail(this.model.nombre)
      .subscribe((cliente) => {
        this.cliente = cliente;
        this.cliente.usuario = this.model;
        this.asignarDpto(
          null,
          this.cliente.domicilio.localidad.departamento.nombre
        );
        this.asignarLocalidad(null, this.cliente.domicilio.localidad.nombre);
        // console.log('** CLIENTE ENCONTRADO: ', this.cliente);
      });
  }

  listarDepartamentosMendoza(): void {
    this.mendozaService.getAllDepartamentos().subscribe((departamentosAPI) => {
      this.departamentos = departamentosAPI.departamentos.filter(
        (departamento) =>
          departamento.nombre == 'Guaymallén' ||
          departamento.nombre == 'Godoy Cruz' ||
          departamento.nombre == 'Capital' ||
          departamento.nombre == 'Maipú'
      );
    });
  }

  asignarDpto(event: any, departamento: string = null): void {
    if (event) {
      this.cliente.domicilio.localidad.departamento.nombre = event.target.value;
    } else {
      this.cliente.domicilio.localidad.departamento.nombre = departamento;
    }
    this.listarLocalidadesMendoza(
      this.cliente.domicilio.localidad.departamento.nombre
    );
  }

  listarLocalidadesMendoza(departamentoCliente: string): void {
    this.mendozaService
      .getLocalidadesXdepartamento(departamentoCliente)
      .subscribe((localidadesAPI) => {
        this.localidades = localidadesAPI.localidades;
      });
  }

  asignarLocalidad(event: any, localidad: string = null): void {
    if (
      event &&
      event.target.value &&
      this.cliente.domicilio.localidad.nombre &&
      !localidad
    ) {
      this.cliente.domicilio.localidad.nombre = event.target.value;
    } else if (localidad) {
      this.cliente.domicilio.localidad.nombre = localidad;
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

  crearUsuario(): void {
    if (
      this.cliente ||
      this.model.rol?.denominacion == 'Cliente' ||
      this.model.rol?.denominacion == 'Administrador'
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
                console.log('***Error X', this.error);
              }
            }
          }
        );
      }
    }
  }

  public crearCliente(): void {
    this.cliente.email = this.model.nombre;
    this.cliente.usuario = this.model;
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
              if (
                typeof err.error == 'string' &&
                err.error.includes(
                  'debe ser una dirección de correo electrónico con formato correcto'
                )
              ) {
                console.log('Cliente / Con foto ::ERROR::', err.error);
                this.error = {
                  formatoEmail:
                    'El email ingresado no contiene un formato correcto',
                };
                this.error = err.error;
                console.log(this.error);
              }
            }
          }
        );
    }
  }

  editarUsuario(): void {
    if (
      this.model.rol.denominacion == 'Cliente' ||
      this.model.rol.denominacion == 'Administrador'
    ) {
      this.editarCliente();
    } else {
      if (!this.fotoSeleccionada) {
        super.editar();
      } else {
        this.service.editarConFoto(this.model, this.fotoSeleccionada).subscribe(
          (usuarioEditado) => {
            this.nombrarEntidad(usuarioEditado);
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
                console.log('Error ***', this.error);
              }
            }
          }
        );
      }
    }
  }

  public editarCliente(): void {
    this.cliente.email = this.model.nombre;
    this.cliente.estado = Number(this.model.estado);
    this.cliente.usuario = this.model;
    // console.log(this.cliente.estado);
    // console.log(this.cliente.nombre);
    // console.log(this.model.estado);
    // console.log(this.model.nombre);

    if (!this.fotoSeleccionada) {
      this.clienteService.editar(this.cliente).subscribe(
        (clienteEditado) => {
          // console.log(clienteEditado);
          this.nombrarEntidadCliente(clienteEditado);
          Swal.fire(
            'Modificado:',
            `CLIENTE sin foto * ${this.denominacionEntidad} * actualizado con éxito`,
            'success'
          );
          this.router.navigate([this.redirect]);
        },
        (err) => {
          if (err.status == 400) {
            this.error = err.error;
            console.log(this.error);
          } else {
            console.log(this.error);
          }
        }
      );
    } else {
      this.clienteService
        .editarConFoto(this.cliente, this.fotoSeleccionada)
        .subscribe(
          (clienteEditado) => {
            this.nombrarEntidadCliente(clienteEditado);
            Swal.fire(
              'Modificado:',
              `CLIENTE con foto * ${this.denominacionEntidad} * actualizado con éxito`,
              'success'
            );
            this.router.navigate([this.redirect]);
          },
          (err) => {
            if (err.status == 400) {
              this.error = err.error;
              console.log(this.error);
            } else {
              console.log(this.error);
            }
          }
        );
    }
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
