package com.utnfrm.controllers;

import com.google.gson.GsonBuilder;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Payment;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;
import com.utnfrm.entities.DetallePedido;
import com.utnfrm.entities.Pedido;
import com.utnfrm.services.PedidoServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @PostMapping("/createAndRedirect")
    public ResponseEntity<?> createPreferenceAndRedirect(@RequestBody Pedido pedido) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new GsonBuilder()
                            .setPrettyPrinting()
                            .create()
                            .toJson(servicio.createPreferenceAndRedirect(pedido)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/success")
    public ResponseEntity<?> success(HttpServletRequest request,
                                     @RequestParam("collection_id") String collectionId,
                                     @RequestParam("collection_status") String collectionStatus,
                                     @RequestParam("payment_id") String paymentId,
                                     @RequestParam String status,
                                     @RequestParam("external_reference") String externalReference,
                                     @RequestParam("payment_type") String paymentType,
                                     @RequestParam("merchant_order_id") String merchantOrderId,
                                     @RequestParam("preference_id") String preferenceId,
                                     @RequestParam("site_id") String siteId,
                                     @RequestParam("processing_mode") String processingMode,
                                     @RequestParam("merchant_account_id") String merchantAccountId
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new GsonBuilder()
                            .setPrettyPrinting()
                            .create()
                            .toJson(servicio.obtainPayment(collectionId)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("SUCCESS: " + e.getMessage());
        }
    }

    @GetMapping("/failure")
    public ResponseEntity<?> failure(HttpServletRequest request,
                                     @RequestParam("collection_id") String collectionId,
                                     @RequestParam("collection_status") String collectionStatus,
                                     @RequestParam("payment_id") String paymentId,
                                     @RequestParam String status,
                                     @RequestParam("external_reference") String externalReference,
                                     @RequestParam("payment_type") String paymentType,
                                     @RequestParam("merchant_order_id") String merchantOrderId,
                                     @RequestParam("preference_id") String preferenceId,
                                     @RequestParam("site_id") String siteId,
                                     @RequestParam("processing_mode") String processingMode,
                                     @RequestParam("merchant_account_id") String merchantAccountId
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new GsonBuilder()
                            .setPrettyPrinting()
                            .create()
                            .toJson(servicio.obtainPayment(collectionId)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("FAILURE: " + e.getMessage());
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<?> pending(HttpServletRequest request,
                                     @RequestParam("collection_id") String collectionId,
                                     @RequestParam("collection_status") String collectionStatus,
                                     @RequestParam("payment_id") String paymentId,
                                     @RequestParam String status,
                                     @RequestParam("external_reference") String externalReference,
                                     @RequestParam("payment_type") String paymentType,
                                     @RequestParam("merchant_order_id") String merchantOrderId,
                                     @RequestParam("preference_id") String preferenceId,
                                     @RequestParam("site_id") String siteId,
                                     @RequestParam("processing_mode") String processingMode,
                                     @RequestParam("merchant_account_id") String merchantAccountId
    ) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new GsonBuilder()
                            .setPrettyPrinting()
                            .create()
                            .toJson(servicio.obtainPayment(collectionId)));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("PENDING: " + e.getMessage());
        }
    }

}
