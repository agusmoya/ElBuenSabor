package com.utnfrm.services;

import com.google.gson.GsonBuilder;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;
import com.utnfrm.entities.MercadoPagoDatos;
import com.utnfrm.entities.Pedido;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;

import java.util.Objects;
import java.util.Optional;

@Service
public class PedidoServiceImpl extends BaseServiceImpl<Pedido, Long> implements PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public PedidoServiceImpl(BaseRepository<Pedido, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public Preference createPreferenceAndRedirect(Pedido pedido) throws Exception {
        try {
            Preference preference = new Preference();
            preference.setBackUrls(
                    new BackUrls()
                            .setSuccess("http://localhost:9000/api/el-buen-sabor/pedidos/success")
                            .setFailure("http://localhost:9000/api/el-buen-sabor/pedidos/failure")
                            .setPending("http://localhost:9000/api/el-buen-sabor/pedidos/pending")
            );
            preference.setAutoReturn(Preference.AutoReturn.approved);
            preference.setExternalReference(pedido.getId().toString());
            pedido.getDetallesPedido().forEach(detallePedido -> {
                Item item = new Item();

                if (Objects.isNull(detallePedido.getArticuloInsumo())) {
                    item.setTitle(detallePedido.getArticuloManufacturado().getDenominacion())
                            .setQuantity(detallePedido.getCantidad())
                            .setUnitPrice(Float.parseFloat(detallePedido.getArticuloManufacturado().getPrecioVenta().toString()));
                    System.out.println("ARTICULO MANUF");
                } else {
                    item.setTitle(detallePedido.getArticuloInsumo().getDenominacion())
                            .setQuantity(detallePedido.getCantidad())
                            .setUnitPrice(Float.parseFloat(detallePedido.getArticuloInsumo().getPrecioVenta().toString()));
                    System.out.println("ARTICULO INSUMO");
                }
                preference.appendItem(item);
            });

            System.out.println("PREFERENCIA: " + new GsonBuilder()
                    .setPrettyPrinting()
                    .create()
                    .toJson(preference));

            var result = preference.save();
            return result;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Payment obtainPayment(String collectionId) throws Exception {
        try {
            var payment = Payment.findById(collectionId);

            Optional<Pedido> optionalPedido = baseRepository.findById(Long.parseLong(payment.getExternalReference()));
            Pedido pedidoBD = optionalPedido.get();

            MercadoPagoDatos mercadoPagoDatos = new MercadoPagoDatos();
            mercadoPagoDatos.setIdentificadorPago(Long.parseLong(payment.getId()));
            mercadoPagoDatos.setFechaCreacion(payment.getDateCreated());
            mercadoPagoDatos.setFechaAprobacion(payment.getDateApproved());
            mercadoPagoDatos.setFormaPago(payment.getPaymentTypeId().name());
            mercadoPagoDatos.setMetodoPago(payment.getPaymentMethodId());
            mercadoPagoDatos.setNroTarjeta(payment.getCard().getFirstSixDigits() + payment.getCard().getLastFourDigits());

            pedidoBD.setMercadoPagoDatos(mercadoPagoDatos);
            super.update(pedidoBD.getId(), pedidoBD);

            System.out.println("PAYMENT: " + new GsonBuilder()
                    .setPrettyPrinting()
                    .create()
                    .toJson(payment));

            return payment;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
