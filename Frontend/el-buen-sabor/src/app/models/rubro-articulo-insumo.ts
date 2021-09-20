import { Generic } from './generic';

export class RubroArticuloInsumo extends Generic {
  rubroPadre: RubroArticuloInsumo;
  rubrosHijos: RubroArticuloInsumo[] = [];
}
