import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { ArticuloManufacturado } from 'src/app/models/articulo-manufacturado';
import { ArticuloManufacturadoService } from 'src/app/services/articulo-manufacturado.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class ProductoDetalleComponent implements OnInit {
  baseEndpoint = BASE_ENDPOINT + '/articulos-manufacturados';
  artManufSeleccionado: ArticuloManufacturado;
  verificado: boolean;
  cantidadAVerificar: number;
  usuarioLogueado: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private serviceArtManuf: ArticuloManufacturadoService,
    private _localStorageService: LocalStorageService
  ) {
    this.verificado = true;
    this.cantidadAVerificar = 1;
  }

  ngOnInit(): void {
    this.usuarioLogueado = this._localStorageService.loadInfo();
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.serviceArtManuf.ver(id).subscribe((artManuf) => {
          this.artManufSeleccionado = artManuf;
          this.verificado = this.verificarStock(this.artManufSeleccionado);
        });
      }
    });
  }

  verificarCantidad(event: any): void {
    const cantidadAverificar: number = event.target.value;

    this.artManufSeleccionado.detallesArticuloManufacturado.forEach(
      (detalleArt) => {
        if (
          detalleArt.articuloInsumo.stockActual <
          cantidadAverificar * detalleArt.cantidad
        ) {
          Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: `¡Lo sentimos, el stock de ${detalleArt.articuloInsumo.denominacion} 
              es insuficiente!`,
          });
          this.verificado = false;
          this.cantidadAVerificar = 1;
        } else if (cantidadAverificar <= 0) {
          Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Debe ingresar una cantidad superior a cero.',
          });
          this.verificado = false;
          this.cantidadAVerificar = 1;
        }
      }
    );
    this.verificado = this.verificarStock(this.artManufSeleccionado);
  }

  verificarStock(artManuf: ArticuloManufacturado): boolean {
    for (const detalleArt of artManuf.detallesArticuloManufacturado) {
      if (detalleArt.articuloInsumo.stockActual < detalleArt.cantidad) {
        return false;
      }
    }
    return true;
  }

  addToShoppingCart(artManufacturado: ArticuloManufacturado): void {
    this._localStorageService.addItem({
      product: artManufacturado,
      quantity: this.cantidadAVerificar,
    });
    this.cantidadAVerificar = 1;
  }

  goBack(): void {
    this.location.back();
  }
}
