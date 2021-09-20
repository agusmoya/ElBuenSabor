package com.utnfrm.controllers;

import com.utnfrm.entities.Base;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.Serializable;

public interface BaseController<E extends Base, ID extends Serializable> {

    public ResponseEntity<?> getAll();

    public ResponseEntity<?> getAll(Pageable pageable);

    public ResponseEntity<?> getOne(@PathVariable ID id);

    public ResponseEntity<?> save(@RequestBody E entity, BindingResult result);

    public ResponseEntity<?> update(@PathVariable ID id, @RequestBody E entity, BindingResult result);

    public ResponseEntity<?> delete(@PathVariable ID id);

}
