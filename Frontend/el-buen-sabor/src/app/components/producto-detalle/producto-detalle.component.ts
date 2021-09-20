import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { ArticuloManufacturado } from 'src/app/models/articulo-manufacturado';
import { ArticuloInsumoService } from 'src/app/services/articulo-insumo.service';
import { ArticuloManufacturadoService } from 'src/app/services/articulo-manufacturado.service';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css'],
})
export class ProductoDetalleComponent implements OnInit {
  
  artManufSeleccionado: ArticuloManufacturado;
  baseEndpoint = BASE_ENDPOINT + '/articulos-manufacturados';

  constructor(
    private route: ActivatedRoute,
    private serviceArtManuf: ArticuloManufacturadoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.serviceArtManuf
          .ver(id)
          .subscribe((artManuf) => (this.artManufSeleccionado = artManuf));
      }
    });
  }
}
