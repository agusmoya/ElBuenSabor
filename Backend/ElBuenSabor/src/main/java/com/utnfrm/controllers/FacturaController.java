package com.utnfrm.controllers;

import com.utnfrm.entities.Factura;
import com.utnfrm.services.FacturaServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/el-buen-sabor/facturas")
public class FacturaController extends BaseControllerImpl<Factura, FacturaServiceImpl> {

}
