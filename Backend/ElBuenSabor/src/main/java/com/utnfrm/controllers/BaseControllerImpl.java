package com.utnfrm.controllers;

import com.utnfrm.entities.Base;
import com.utnfrm.services.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

//@CrossOrigin({"*"})
//@CrossOrigin(origins = "*")
@CrossOrigin({"http://localhost:4200"})
public abstract class BaseControllerImpl<E extends Base, S extends BaseServiceImpl<E, Long>> implements BaseController<E, Long> {

    @Autowired
    protected S servicio;

    @GetMapping("")
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/paged")
    public ResponseEntity<?> getAll(Pageable pageable) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.findAll(pageable));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity<?> save(@Valid @RequestBody E entity, BindingResult result) {
        try {
            if (result.hasErrors()) {
                return this.validar(result);
            }
            return ResponseEntity.status(HttpStatus.OK).body(servicio.save(entity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @Valid @RequestBody E entity, BindingResult result) {
        try {
            if (result.hasErrors()) {
                return this.validar(result);
            }
            return ResponseEntity.status(HttpStatus.OK).body(servicio.update(id, entity));

        } catch (Exception e) {
            System.out.println("Mensaje de error:" + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/eliminar/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(servicio.delete(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    protected ResponseEntity<?> validar(BindingResult result) {
        Map<String, Object> errores = new HashMap<>();
        result.getFieldErrors().forEach(error -> {
            errores.put(error.getField(), "Este campo " + " " + error.getDefaultMessage());
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errores);
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> delete(@PathVariable Long id) {
//        try {
//            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(servicio.delete(id));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
//        }
//    }
}
