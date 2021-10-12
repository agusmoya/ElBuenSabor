package com.utnfrm.services;

import com.utnfrm.entities.Cliente;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class ClienteServiceImpl extends BaseServiceImpl<Cliente, Long> implements ClienteService {
    @Autowired
    private ClienteRepository clienteRepository;

    public ClienteServiceImpl(BaseRepository<Cliente, Long> baseRepository) {
        super(baseRepository);
    }
}
