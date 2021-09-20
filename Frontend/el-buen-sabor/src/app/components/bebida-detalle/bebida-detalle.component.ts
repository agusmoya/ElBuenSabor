import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { ArticuloInsumo } from 'src/app/models/articulo-insumo';
import { ArticuloInsumoService } from 'src/app/services/articulo-insumo.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bebida-detalle',
  templateUrl: './bebida-detalle.component.html',
  styleUrls: ['./bebida-detalle.component.css'],
})
export class BebidaDetalleComponent implements OnInit {
  artInsumoBebida: ArticuloInsumo;
  baseEndpoint = BASE_ENDPOINT + '/articulos-manufacturados';
  verificado: boolean = true;
  cantidadAVerificar: number = 1;

  constructor(
    private route: ActivatedRoute,
    private serviceArtInsumo: ArticuloInsumoService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.serviceArtInsumo.ver(id).subscribe((bebida) => {
          this.artInsumoBebida = bebida;
        });
      }
    });
  }

  verificarCantidad(event: any): void {
    const cantidadAverificar: number = event.target.value;
    if (cantidadAverificar > this.artInsumoBebida.stockActual) {
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: '¡Lo sentimos, el stock es insuficiente!',
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
    } else {
      this.verificado = true;
    }
  }

  agregarAlCarroDeCompra(artInsumoBebida: ArticuloInsumo): void {
    // console.log('***Cantidad:', this.cantidadAVerificar);
    // console.log('***ArtInsumo:', artInsumoBebida);
    this._localStorageService.addItem({
      item: artInsumoBebida,
      cantidad: this.cantidadAVerificar,
    });
  }
}
