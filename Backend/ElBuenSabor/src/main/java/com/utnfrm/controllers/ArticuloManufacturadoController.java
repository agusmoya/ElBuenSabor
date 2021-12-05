package com.utnfrm.controllers;

import com.utnfrm.entities.ArticuloManufacturado;
import com.utnfrm.services.ArticuloManufacturadoServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping(path = "api/el-buen-sabor/articulos-manufacturados")
public class ArticuloManufacturadoController extends BaseControllerImpl<ArticuloManufacturado, ArticuloManufacturadoServiceImpl> {

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
            @Valid ArticuloManufacturado artManuf, BindingResult result,
            @RequestParam MultipartFile archivo) {
        try {

            System.out.println("IMPRIMO ESTOOO:" + artManuf.getDetallesArticuloManufacturado());

            if (!archivo.isEmpty()) {
                artManuf.setImagen(archivo.getBytes());
            }
            return super.save(artManuf, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/editar-con-foto/{id}")
    public ResponseEntity<?> editarConFoto(
            @PathVariable Long id, @Valid ArticuloManufacturado artManuf,
            BindingResult result, @RequestParam MultipartFile archivo) {
        try {
            if (!archivo.isEmpty()) {
                artManuf.setImagen(archivo.getBytes());
            }
            return super.update(id, artManuf, result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
