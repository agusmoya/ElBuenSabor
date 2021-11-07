package com.utnfrm.controllers;

import com.utnfrm.entities.Domicilio;
import com.utnfrm.services.DomicilioServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/el-buen-sabor/domicilios")
public class DomicilioController extends BaseControllerImpl<Domicilio, DomicilioServiceImpl>{
}
