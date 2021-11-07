import { Directive, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Generic } from '../models/generic';
import { CommonService } from '../services/common.service';

@Directive()
export abstract class CommonListarComponent<
  E extends Generic,
  S extends CommonService<E>
> implements OnInit
{
  titulo: string;
  lista: E[];
  protected nombreModelo: string;
  protected denominacionEntidad: string;

  totalRegistros = 0;
  paginaActual = 0;
  totalPorPagina = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(protected service: S) {}

  ngOnInit(): void {
    this.calcularRangos();
  }

  paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.calcularRangos();
  }

  protected calcularRangos() {
    this.service
      .listarPaginado(
        this.paginaActual.toString(),
        this.totalPorPagina.toString()
      )
      .subscribe((paginador) => {
        this.lista = paginador.content as E[];
        this.totalRegistros = paginador.totalElements as number;
        if (this.paginator) {
          this.paginator._intl.itemsPerPageLabel = 'Elementos por página:';
        }
      });
  }

  public eliminar(entity: E): void {
    // metodo para nombrar la entidad a eliminar, dentro del modal de SweetAlert
    this.nombrarEntidad(entity);
    Swal.fire({
      title: `Atención`,
      text: `¿Seguro que desea eliminar el ${this.nombreModelo}: *${this.denominacionEntidad}*?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminar(entity).subscribe(() => {
          this.calcularRangos();
          Swal.fire(
            'Eliminado',
            `${this.nombreModelo} *${this.denominacionEntidad}* eliminado con éxito`,
            'success'
          );
        });
      }
    });
  }

  nombrarEntidad(entity: E): void {
    if (entity.denominacion) {
      this.denominacionEntidad = entity.denominacion;
    } else if (entity.nombre) {
      this.denominacionEntidad = entity.nombre;
    }
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
