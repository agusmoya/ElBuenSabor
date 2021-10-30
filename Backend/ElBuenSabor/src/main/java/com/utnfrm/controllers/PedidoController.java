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
        preference.setBackUrls(
                new BackUrls()
                        .setFailure("http://localhost:9000/failure")
                        .setPending("http://localhost:9000/pending")
                        .setSuccess("http://localhost:4200/home")
        );
        preference.setAutoReturn(Preference.AutoReturn.approved);

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

//    @PostMapping("/createAndRedirect")
//    public ResponseEntity<?> createAndRedirectMP(@RequestBody Pedido pedido) {
//        try {
//            Preference preference = new Preference();
//            preference.setBackUrls(
//                    new BackUrls()
//                            .setFailure("http://localhost:9000/failure")
//                            .setPending("http://localhost:9000/pending")
//                            .setSuccess("http://localhost:4200/home") // Anduvo!
//            );
//            preference.setAutoReturn(Preference.AutoReturn.approved);
//
//            pedido.getDetallesPedido().forEach(detallePedido -> {
//                Item item = new Item();
//
//                if (detallePedido.getArticuloInsumo() != null) {
//                    item.setTitle(detallePedido.getArticuloInsumo().getDenominacion())
//                            .setQuantity(detallePedido.getCantidad())
//                            .setUnitPrice(Float.parseFloat(detallePedido.getArticuloInsumo().getPrecioVenta().toString()));
//                    System.out.println("ARTICULO INSUMO");
//                } else {
//                    item.setTitle(detallePedido.getArticuloManufacturado().getDenominacion())
//                            .setQuantity(detallePedido.getCantidad())
//                            .setUnitPrice(Float.parseFloat(detallePedido.getArticuloInsumo().getPrecioVenta().toString()));
//                    System.out.println("ARTICULO MANUF");
//                }
//                preference.appendItem(item);
//            });
//
//            var result = preference.save();
//
//            return ResponseEntity.status(HttpStatus.OK).body(new GsonBuilder().setPrettyPrinting().create().toJson(result));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
//        }
//    }


//    @GetMapping("/success")
//    public String success(HttpServletRequest request,
//                          @RequestParam("collection_id") String collectionId,
//                          @RequestParam("collection_status") String collectionStatus,
//                          @RequestParam("external_reference") String externalReference,
//                          @RequestParam("payment_type") String paymentType,
//                          @RequestParam("merchant_order_id") String merchantOrderId,
//                          @RequestParam("preference_id") String preferenceId,
//                          @RequestParam("site_id") String siteId,
//                          @RequestParam("processing_mode") String processingMode,
//                          @RequestParam("merchant_account_id") String merchantAccountId,
//                          Model model
//    ) throws MPException {
//        var payment = com.mercadopago.resources.Payment.findById(collectionId);
////        System.out.println(new GsonBuilder().setPrettyPrinting().create().toJson(payment));
//        model.addAttribute("payment", payment);
//        return "ok";
//    }
//
//    @GetMapping("/failure")
//    public String failure(HttpServletRequest request,
//                          @RequestParam("collection_id") String collectionId,
//                          @RequestParam("collection_status") String collectionStatus,
//                          @RequestParam("external_reference") String externalReference,
//                          @RequestParam("payment_type") String paymentType,
//                          @RequestParam("merchant_order_id") String merchantOrderId,
//                          @RequestParam("preference_id") String preferenceId,
//                          @RequestParam("site_id") String siteId,
//                          @RequestParam("processing_mode") String processingMode,
//                          @RequestParam("merchant_account_id") String merchantAccountId,
//                          Model model
//    ) throws MPException {
//        var payment = com.mercadopago.resources.Payment.findById(collectionId);
//        System.out.println(new GsonBuilder().setPrettyPrinting().create().toJson(payment));
//        model.addAttribute("payment", payment);
//        return "fail";
//    }

}
