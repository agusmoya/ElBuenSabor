import { Component, OnInit } from '@angular/core';
import { BASE_ENDPOINT } from '../../config/app';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import { CommonListarComponent } from '../common-listar.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent
  extends CommonListarComponent<Rol, RolService>
  implements OnInit
{
  baseEndpoint = BASE_ENDPOINT + '/roles'

  constructor(service: RolService) {
    super(service);
    this.titulo = 'Listado de Roles';
    this.nombreModelo = Rol.name;
  }
}

// PROBLEMA DE CORS (Cross-origin resource sharing):
// Intercambio de recursos de origen cruzado. Ocurre
// cuando una app cliente (en este caso Angular), se trata
// de comunicar con una app externa mediante API REST, y esta API requiere
// cierto control de acceso, es decir, que el CLIENTE se identifique en las
// CABECERAS. Entonces, tenemos que permitir que los clientes que estén
// enviando solicitudes(requests) a nuestro API REST, permitir ese dominio o IP,
// en este caso localhost:4200

/*
export class RolesComponent implements OnInit {
  titulo: string = 'Listado de Roles';
  roles: Rol[] = [];

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: RolService) {}

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  private calcularRangos() {
    this.service
      .listarPaginado(
        this.paginaActual.toString(),
        this.totalPorPagina.toString()
      )
      .subscribe((paginador) => {
        this.roles = paginador.content as Rol[];
        // para mostrar solo los roles activos
        //this.roles = this.roles.filter((rol) => rol.estado != 0);
        //this.totalRegistros = this.roles.length;
        this.totalRegistros = paginador.totalElements as number;
        this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
      });
  }

  public eliminar(rol: Rol): void {
    Swal.fire({
      title: `Atención`,
      text: `¿Seguro que desea eliminar el Rol: *${rol.denominacion}*?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(rol).subscribe(() => {
          this.calcularRangos();
          Swal.fire(
            'Eliminado',
            `Rol *${rol.denominacion}* eliminado con éxito`,
            'success'
          );
        });
      }
    });
  }
}
*/
