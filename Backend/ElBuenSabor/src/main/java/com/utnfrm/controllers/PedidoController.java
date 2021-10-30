package com.utnfrm.controllers;

import com.google.gson.GsonBuilder;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;
import com.utnfrm.entities.DetallePedido;
import com.utnfrm.entities.Pedido;
import com.utnfrm.services.PedidoServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Objects;

@RestController
@RequestMapping(path = "api/el-buen-sabor/pedidos")
public class PedidoController extends BaseControllerImpl<Pedido, PedidoServiceImpl> {

    // MERCADO PAGO
    @PostMapping("/createAndRedirect")
    public String createAndRedirect(@RequestBody Pedido pedido) throws MPException {
        Preference preference = new Preference();
//                .setSuccess("http://localhost:4200/home")
        preference.setBackUrls(
                new BackUrls()
                        .setFailure("http://localhost:9000/failure")
                        .setPending("http://localhost:9000/pending")
                        .setSuccess("http://localhost:9000/api/el-buen-sabor/pedidos/success")
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

        var result = preference.save();

        return new GsonBuilder().setPrettyPrinting().create().toJson(result);
    }


    @GetMapping("/success")
    public String success(HttpServletRequest request,
                          @RequestParam("collection_id") String collectionId,
                          @RequestParam("collection_status") String collectionStatus,
                          @RequestParam("external_reference") String externalReference,
                          @RequestParam("payment_type") String paymentType,
                          @RequestParam("merchant_order_id") String merchantOrderId,
                          @RequestParam("preference_id") String preferenceId,
                          @RequestParam("site_id") String siteId,
                          @RequestParam("processing_mode") String processingMode,
                          @RequestParam("merchant_account_id") String merchantAccountId,
                          Model model
    ) throws MPException {
        var payment = com.mercadopago.resources.Payment.findById(collectionId);
        System.out.println(new GsonBuilder().setPrettyPrinting().create().toJson(payment));
        model.addAttribute("payment", payment);
        return "ok";
    }

    @GetMapping("/failure")
    public String failure(HttpServletRequest request,
                          @RequestParam("collection_id") String collectionId,
                          @RequestParam("collection_status") String collectionStatus,
                          @RequestParam("external_reference") String externalReference,
                          @RequestParam("payment_type") String paymentType,
                          @RequestParam("merchant_order_id") String merchantOrderId,
                          @RequestParam("preference_id") String preferenceId,
                          @RequestParam("site_id") String siteId,
                          @RequestParam("processing_mode") String processingMode,
                          @RequestParam("merchant_account_id") String merchantAccountId,
                          Model model
    ) throws MPException {
        var payment = com.mercadopago.resources.Payment.findById(collectionId);
        System.out.println(new GsonBuilder().setPrettyPrinting().create().toJson(payment));
        model.addAttribute("payment", payment);
        return "fail";
    }

    @GetMapping("/pending")
    public String pending(HttpServletRequest request,
                          @RequestParam("collection_id") String collectionId,
                          @RequestParam("collection_status") String collectionStatus,
                          @RequestParam("external_reference") String externalReference,
                          @RequestParam("payment_type") String paymentType,
                          @RequestParam("merchant_order_id") String merchantOrderId,
                          @RequestParam("preference_id") String preferenceId,
                          @RequestParam("site_id") String siteId,
                          @RequestParam("processing_mode") String processingMode,
                          @RequestParam("merchant_account_id") String merchantAccountId,
                          Model model
    ) throws MPException {
        var payment = com.mercadopago.resources.Payment.findById(collectionId);
        System.out.println(new GsonBuilder().setPrettyPrinting().create().toJson(payment));
        model.addAttribute("payment", payment);
        return "pending";
    }

}
