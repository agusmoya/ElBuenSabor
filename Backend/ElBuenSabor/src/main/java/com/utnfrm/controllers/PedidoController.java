package com.utnfrm.controllers;

import com.google.gson.GsonBuilder;
import com.utnfrm.entities.Pedido;
import com.utnfrm.services.PedidoServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;


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
    public ResponseEntity<?> success(HttpServletResponse response,
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
            servicio.obtainPayment(collectionId);
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new GsonBuilder()
//                            .setPrettyPrinting()
//                            .create()
//                            .toJson(servicio.obtainPayment(collectionId)));
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create("http://localhost:4200/carro-compra?status=" + status))
                    .build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("SUCCESS ERROR: " + e.getMessage());
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
            servicio.obtainPayment(collectionId);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create("http://localhost:4200/carro-compra?status=" + status))
                    .build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("FAILURE ERROR: " + e.getMessage());
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
            servicio.obtainPayment(collectionId);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create("http://localhost:4200/carro-compra?status=" + status))
                    .build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("PENDING ERROR: " + e.getMessage());
        }
    }

}
