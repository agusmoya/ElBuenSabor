import { Cliente } from './cliente';
import { DetallePedido } from './detalle-pedido';
import { Domicilio } from './domicilio';
import { EstadoPedido } from './estado-pedido';
import { Factura } from './factura';
import { Generic } from './generic';
import { MercadoPagoDatos } from './mercado-pago-datos';

export class Pedido extends Generic {
  fecha: Date;
  numero: number;
  estadoPedido: EstadoPedido;
  horaEstimadaFin: Date;
  tipoEnvio: number;
  mercadoPagoDatos: MercadoPagoDatos;
  factura: Factura;
  detallesPedido: DetallePedido[] = [];
  cliente: Cliente;
  domicilio: Domicilio;

}
