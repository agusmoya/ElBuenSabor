package com.utnfrm.controllers;

import com.utnfrm.entities.Cliente;
import com.utnfrm.services.ClienteServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/el-buen-sabor/clientes")
public class ClienteController extends BaseControllerImpl<Cliente, ClienteServiceImpl> {

    @GetMapping("/buscar-por-email/{email}")
    public ResponseEntity<?> buscarPorEmail(@PathVariable String email) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.buscarPorEmail(email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
