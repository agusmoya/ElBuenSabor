package com.utnfrm.services;

import com.utnfrm.entities.Cliente;

public interface ClienteService extends BaseService<Cliente, Long> {
    Cliente buscarPorEmail(String email) throws Exception;
}
