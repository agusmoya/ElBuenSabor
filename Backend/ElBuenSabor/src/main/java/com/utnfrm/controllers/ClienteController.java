package com.utnfrm.controllers;

import com.utnfrm.entities.Cliente;
import com.utnfrm.entities.Usuario;
import com.utnfrm.services.ClienteServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

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

        System.out.println(cliente.getUsuario().getNombre());
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
