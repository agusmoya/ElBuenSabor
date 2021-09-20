package com.utnfrm.controllers;

import com.utnfrm.entities.RubroGeneral;
import com.utnfrm.services.RubroGeneralServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/el-buen-sabor/rubros-generales")
public class RubroGeneralController extends BaseControllerImpl<RubroGeneral, RubroGeneralServiceImpl> {

    @GetMapping("/cargar/img/{id}")
    public ResponseEntity<?> verFoto(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_JPEG).body(servicio.verFoto(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping("/crear-con-foto")
    public ResponseEntity<?> crearConFoto(
            @Valid RubroGeneral rubroGeneral, BindingResult result,
            @RequestParam MultipartFile archivo) {
        try {
            if (!archivo.isEmpty()) {
                rubroGeneral.setImagen(archivo.getBytes());
            }
            return super.save(rubroGeneral, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/editar-con-foto/{id}")
    public ResponseEntity<?> editarConFoto(
            @PathVariable Long id, @Valid RubroGeneral rubroGeneral,
            BindingResult result, @RequestParam MultipartFile archivo) {
        try {
            if (!archivo.isEmpty()) {
                rubroGeneral.setImagen(archivo.getBytes());
            }
            return super.update(id, rubroGeneral, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
