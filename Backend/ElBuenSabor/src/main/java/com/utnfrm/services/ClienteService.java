package com.utnfrm.services;

import com.utnfrm.entities.Cliente;
import com.utnfrm.entities.Usuario;

public interface ClienteService extends BaseService<Cliente, Long> {
    Cliente buscarPorEmail(String email) throws Exception;
}
