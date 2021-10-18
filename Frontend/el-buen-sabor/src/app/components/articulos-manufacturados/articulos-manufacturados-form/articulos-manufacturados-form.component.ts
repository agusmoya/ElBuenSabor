import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticuloInsumo } from 'src/app/models/articulo-insumo';
import { ArticuloManufacturado } from 'src/app/models/articulo-manufacturado';
import { ArticuloManufacturadoDetalle } from 'src/app/models/articulo-manufacturado-detalle';
import { ArticuloInsumoService } from 'src/app/services/articulo-insumo.service';
import { ArticuloManufacturadoService } from 'src/app/services/articulo-manufacturado.service';
import { CommonFormComponent } from '../../common-form.component';
import { RubroGeneral } from 'src/app/models/rubro-general';
import { RubroGeneralService } from 'src/app/services/rubro-general.service';

@Component({
  selector: 'app-articulos-manufacturados-form',
  templateUrl: './articulos-manufacturados-form.component.html',
  styleUrls: ['./articulos-manufacturados-form.component.css'],
})
export class ArticulosManufacturadosFormComponent
  extends CommonFormComponent<
    ArticuloManufacturado,
    ArticuloManufacturadoService
  >
  implements OnInit
{
  private fotoSeleccionada: File;
  artInsumoSeleccionado: ArticuloInsumo;
  arrayArticulosInsumo: ArticuloInsumo[];
  arrayArtManufacturados: ArticuloManufacturado[];
  arrayRubrosGenerales: RubroGeneral[];
  formularioValido: boolean = true;

  constructor(
    serviceArtManuf: ArticuloManufacturadoService,
    private serviceArtInsumo: ArticuloInsumoService,
    private serviceRubroGeneral: RubroGeneralService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(serviceArtManuf, router, route);
    this.titulo = 'Crear Nuevo Artículo Manufacturado';
    this.model = new ArticuloManufacturado();
    this.redirect = '/articulos-manufacturados';
    this.nombreModelo = ArticuloManufacturado.name;
    this.arrayArticulosInsumo = [];
    this.arrayArtManufacturados = [];
    this.arrayRubrosGenerales = [];
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getArticulosInsumo();
    this.getRubrosGenerales();
  }

  getArticulosInsumo(): void {
    this.serviceArtInsumo
      .getAllArticulosInsumo()
      .subscribe((articulosInsumo) => {
        this.arrayArticulosInsumo = articulosInsumo.filter(
          (art) => art.esInsumo
        );
      });
  }

  getRubrosGenerales(): void {
    this.serviceRubroGeneral
      .listar()
      .subscribe((rubros) => (this.arrayRubrosGenerales = rubros));
  }

  asignarRubroGeneral(event: any): void {
    let rubroSeleccionado: RubroGeneral = this.arrayRubrosGenerales.find(
      (rubro) => rubro.denominacion == event.target.value
    );
    this.model.rubroGeneral = rubroSeleccionado;
    console.log(this.model);
  }

  agregarDetalle(): void {
    this.model.detallesArticuloManufacturado.push(
      new ArticuloManufacturadoDetalle()
    );
  }

  // 1° Parámetro: $event => [value]= posicion en array de articulos insumo
  // 2° Parámetro: posicionArrayArtManufacturados => posicion en Array de articulos Manufacturados
  seleccionarArticuloInsumo(
    event: any,
    posicionArrayArtManufacturados: number
  ): void {
    console.log('POSICION: ', event.target.value);
    const indiceArrArtInsumos = event.target.value;
    const objArtInsumo = this.arrayArticulosInsumo[indiceArrArtInsumos];
    console.log('OBJETO: ', objArtInsumo);

    // asigno unidad de medida. Quiero que sea el mismo valor
    // en el art-insumo y en art-manufacturado
    // para trabajar el stock con unidades iguales
    this.model.detallesArticuloManufacturado[
      posicionArrayArtManufacturados
    ].unidadMedida = objArtInsumo.unidadMedida;

    // asigno art-insumo al art-manufacturado
    this.model.detallesArticuloManufacturado[
      posicionArrayArtManufacturados
    ].articuloInsumo = objArtInsumo;
  }

  asignarCantidad(detalle: ArticuloManufacturadoDetalle, event: any): void {
    detalle.cantidad = event.target.value; // cantidad
    Number(event.target.value) === 0
      ? (this.formularioValido = false)
      : (this.formularioValido = true);
    console.log('******', event.target.value);
  }

  quitarArticuloDetalle(index: number): void {
    this.model.detallesArticuloManufacturado.splice(index, 1);
  }

  public seleccinarFoto($event): void {
    this.fotoSeleccionada = $event.target.files[0];

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
        (artManuf) => {
          // metodo para nombrar la entidad a crear, dentro del modal de SweetAlert
          this.nombrarEntidad(artManuf);
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
