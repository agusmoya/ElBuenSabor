package com.utnfrm;

import com.mercadopago.MercadoPago;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ElbuensaborApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(ElbuensaborApplication.class, args);
    }

    @Override
    public void run(String[] args) throws Exception {
        MercadoPago.SDK.setAccessToken("TEST-6539016268685399-102616-5ebd73e424fc3b9b640b9982cda2105f-135885560");
    }
}
