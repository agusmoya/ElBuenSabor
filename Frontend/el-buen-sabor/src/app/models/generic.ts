export abstract class Generic {
  id: number;
  estado: number;
  // a fines de nombrar las entidades en
  // componentes genéricos del front
  // (common-listar y common-form)------
  nombre: string;
  denominacion: string;
  //------------------------------------

  createdAt: Date;
  updatedAt: Date;
}
