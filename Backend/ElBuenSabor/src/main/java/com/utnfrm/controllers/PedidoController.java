package com.utnfrm.controllers;

import com.utnfrm.entities.Pedido;
import com.utnfrm.services.PedidoServiceImpl;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(origins = "*")
@RequestMapping(path = "api/el-buen-sabor/pedidos")
public class PedidoController extends BaseControllerImpl<Pedido, PedidoServiceImpl> {
}
