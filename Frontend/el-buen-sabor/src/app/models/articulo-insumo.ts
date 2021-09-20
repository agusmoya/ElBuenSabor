import { Generic } from './generic';
import { RubroArticuloInsumo } from './rubro-articulo-insumo';

export class ArticuloInsumo extends Generic {
  denominacion: string;
  precioCompra: number;
  precioVenta: number;
  stockActual: number;
  stockMinimo: number;
  unidadMedida: string;
  esInsumo: boolean;
  imagenHashCode: number;
  rubroPadre: RubroArticuloInsumo;
  rubroHijo: RubroArticuloInsumo;
}
