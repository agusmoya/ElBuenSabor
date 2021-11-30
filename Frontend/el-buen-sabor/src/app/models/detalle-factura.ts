import { ArticuloInsumo } from './articulo-insumo';
import { ArticuloManufacturado } from './articulo-manufacturado';
import { Generic } from './generic';

export class DetalleFactura extends Generic {
  cantidad: number;
  subtotal: number;
  articuloManufacturado: ArticuloManufacturado;
  articuloInsumo: ArticuloInsumo;
}
