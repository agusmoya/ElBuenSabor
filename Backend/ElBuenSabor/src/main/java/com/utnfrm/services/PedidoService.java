package com.utnfrm.services;

import com.mercadopago.resources.Payment;
import com.mercadopago.resources.Preference;
import com.utnfrm.entities.Pedido;

public interface PedidoService extends BaseService<Pedido, Long> {

    Preference createPreferenceAndRedirect(Pedido pedido) throws Exception;

    Payment obtainPayment(String collectionId) throws Exception;

    Long obtenerUltimoNroPedido() throws Exception;

}
