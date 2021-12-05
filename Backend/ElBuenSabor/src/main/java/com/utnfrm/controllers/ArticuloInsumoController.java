package com.utnfrm.controllers;

import com.utnfrm.entities.ArticuloInsumo;
import com.utnfrm.services.ArticuloInsumoServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/el-buen-sabor/articulos-insumo")
public class ArticuloInsumoController extends BaseControllerImpl<ArticuloInsumo, ArticuloInsumoServiceImpl> {

    @GetMapping("/rubros")
    public ResponseEntity<?> listarRubros() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.findAllRubrosInsumo());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

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
            @Valid ArticuloInsumo artInsumo, BindingResult result,
            @RequestParam MultipartFile archivo) {
        try {
            if (!archivo.isEmpty()) {
                artInsumo.setImagen(archivo.getBytes());
            }
            return super.save(artInsumo, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/editar-con-foto/{id}")
    public ResponseEntity<?> editarConFoto(
            @PathVariable Long id, @Valid ArticuloInsumo artInsumo,
            BindingResult result, @RequestParam MultipartFile archivo) {
        try {
            if (!archivo.isEmpty()) {
                artInsumo.setImagen(archivo.getBytes());
            }
            return super.update(id, artInsumo, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
