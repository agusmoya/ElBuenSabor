import { ArticuloManufacturadoDetalle } from './articulo-manufacturado-detalle';
import { Generic } from './generic';
import { RubroGeneral } from './rubro-general';

export class ArticuloManufacturado extends Generic {
  tiempoEstimadoCocina: number;
  precioVenta: number;
  imagenHashCode: string;
  rubroGeneral: RubroGeneral;
  detallesArticuloManufacturado: ArticuloManufacturadoDetalle[] = [];
}
