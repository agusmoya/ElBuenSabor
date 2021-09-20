import { ArticuloInsumo } from './articulo-insumo';
import { Generic } from './generic';

export class ArticuloManufacturadoDetalle extends Generic {
  cantidad: number;
  unidadMedida: string;
  articuloInsumo: ArticuloInsumo;

  constructor(cantidad: number = 0, unidadMedida: string = '') {
    super();
    this.cantidad = cantidad;
    this.unidadMedida = unidadMedida;
  }
}
