package com.utnfrm.controllers;

import com.utnfrm.entities.EstadoPedido;
import com.utnfrm.services.EstadoPedidoServiceImpl;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/el-buen-sabor/estados-pedidos")
public class EstadoPedidoController extends BaseControllerImpl<EstadoPedido, EstadoPedidoServiceImpl> {
}
