package com.utnfrm.controllers;

import com.google.gson.GsonBuilder;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Preference;
import com.mercadopago.resources.datastructures.preference.BackUrls;
import com.mercadopago.resources.datastructures.preference.Item;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(path = "api/el-buen-sabor/mercado-pago")
public class MercadoPagoController {

    @GetMapping("/createAndRedirect")
    public String createAndRedirect() throws MPException {
        Preference preference = new Preference();

        preference.setBackUrls(
                new BackUrls()
                        .setFailure("http://localhost:9000/failure")
                        .setPending("http://localhost:9000/pending")
                        .setSuccess("http://localhost:4200/home") // Anduvo!
        );
        preference.setAutoReturn(Preference.AutoReturn.approved);

        Item item = new Item();
        item.setTitle("Test Item")
                .setQuantity(2)
                .setUnitPrice((float) 75.56);

        preference.appendItem(item);
        var result = preference.save();
        System.out.println(result.getSandboxInitPoint());
        return result.getSandboxInitPoint();
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

}
