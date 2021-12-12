import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BASE_ENDPOINT } from 'src/app/config/app';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { Location } from '@angular/common';
import { ArticuloInsumo } from 'src/app/models/articulo-insumo';
import { ArticuloManufacturado } from 'src/app/models/articulo-manufacturado';
import { DetallePedido } from 'src/app/models/detalle-pedido';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css'],
})
export class PedidoDetalleComponent implements OnInit {
  baseEndpoint = BASE_ENDPOINT + '/pedidos';

  pedidoEncontrado: Pedido;
  arrayDetallePedidoBebidas: DetallePedido[];
  arrayDetallePedidoArtManuf: DetallePedido[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) {
    this.arrayDetallePedidoBebidas = [];
    this.arrayDetallePedidoArtManuf = [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = Number(params.get('id'));
      if (id) {
        this.pedidoService.ver(id).subscribe((pedido) => {
          this.pedidoEncontrado = pedido;
          this.filtrarPorBebidas();
          this.filtrarPorArtManuf();
        });
      }
    });
  }

  filtrarPorBebidas(): void {
    this.pedidoEncontrado.detallesPedido.map((detalle) => {
      if (detalle.articuloInsumo != null) {
        this.arrayDetallePedidoBebidas.push(detalle);
      }
    });
  }

  filtrarPorArtManuf(): void {
    this.pedidoEncontrado.detallesPedido.map((detalle) => {
      if (detalle?.articuloManufacturado != null) {
        this.arrayDetallePedidoArtManuf.push(detalle);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}
