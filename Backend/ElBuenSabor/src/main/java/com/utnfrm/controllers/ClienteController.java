package com.utnfrm.controllers;

import com.utnfrm.entities.Cliente;
import com.utnfrm.services.ClienteServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/el-buen-sabor/clientes")
public class ClienteController extends BaseControllerImpl<Cliente, ClienteServiceImpl> {
}
