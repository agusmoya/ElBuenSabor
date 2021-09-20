package com.utnfrm.controllers;

import com.utnfrm.entities.Usuario;
import com.utnfrm.services.UsuarioServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/el-buen-sabor/usuarios")
public class UsuarioController extends BaseControllerImpl<Usuario, UsuarioServiceImpl> {

    @GetMapping("/cargar/img/{id}")
    public ResponseEntity<?> verFoto(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_JPEG).body(servicio.verFoto(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/verificar-login")
    public ResponseEntity<?> verificarLogin(@Valid @RequestBody Usuario usuario, BindingResult result) {
        try {
            if (result.hasErrors()) {
                return super.validar(result);
            }
            return ResponseEntity.status(HttpStatus.OK).body(servicio.verificacionLogin(usuario));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
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
            @Valid Usuario usuario, BindingResult result,
            @RequestParam MultipartFile archivo) {
        try {
            if (!archivo.isEmpty()) {
                usuario.setImagen(archivo.getBytes());
            }
            return super.save(usuario, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/editar-con-foto/{id}")
    public ResponseEntity<?> editarConFoto(
            @PathVariable Long id, @Valid Usuario usuario,
            BindingResult result, @RequestParam MultipartFile archivo) {
        try {
            if (!archivo.isEmpty()) {
                usuario.setImagen(archivo.getBytes());
            }
            return super.update(id, usuario, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
