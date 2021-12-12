package com.utnfrm.controllers;

import com.utnfrm.entities.Cliente;
import com.utnfrm.services.ClienteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.sql.Blob;

@RestController
@RequestMapping(path = "api/el-buen-sabor/clientes")
public class ClienteController extends BaseControllerImpl<Cliente, ClienteServiceImpl> {


    @PostMapping("/send-mail/{idCliente}")
    public ResponseEntity<?> sendSiempleMail(@PathVariable Long idCliente, @RequestBody String fileName) {

        try {
            return ResponseEntity.status(HttpStatus.OK).body("Mail con pdf enviado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/send-mail-pdf/{idCliente}")
    public ResponseEntity<?> sendMailWithAttachment(@PathVariable Long idCliente, @RequestParam MultipartFile file) {
        try {
            servicio.sendEmailWithAttachment(file, idCliente);
            return ResponseEntity.status(HttpStatus.OK).body("Mail con pdf enviado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{idCliente}/{idFactura}/factura/export/pdf")
    public void exportToPDF(@PathVariable Long idCliente, @PathVariable Long idFactura, HttpServletResponse response) {
        System.out.println("CLIENTE ID:" + idCliente);
        System.out.println("FACTURA ID:" + idFactura);
        try {
            servicio.exportToPDF(idCliente, idFactura, response);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }


    @GetMapping("/buscar-por-email/{email}")
    public ResponseEntity<?> buscarPorEmail(@PathVariable String email) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.buscarPorEmail(email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/crear-con-foto")
    public ResponseEntity<?> crearConFoto(
            @Valid Cliente cliente, BindingResult result,
            @RequestParam MultipartFile archivo) {
        try {
            if (!archivo.isEmpty()) {
                cliente.getUsuario().setImagen(archivo.getBytes());
            }
            return super.save(cliente, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/editar-con-foto/{id}")
    public ResponseEntity<?> editarConFoto(
            @PathVariable Long id, @Valid Cliente cliente, BindingResult result,
            @RequestParam MultipartFile archivo) {
        try {
            if (!archivo.isEmpty()) {
                cliente.getUsuario().setImagen(archivo.getBytes());
            }
            return super.update(id, cliente, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}
