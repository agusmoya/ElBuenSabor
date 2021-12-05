package com.utnfrm.controllers;

import com.utnfrm.entities.RubroArticuloInsumo;
import com.utnfrm.services.RubroArticuloInsumoServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/el-buen-sabor/rubros-articulo-insumo")
public class RubroArticuloInsumoController extends BaseControllerImpl<RubroArticuloInsumo, RubroArticuloInsumoServiceImpl> {
}
