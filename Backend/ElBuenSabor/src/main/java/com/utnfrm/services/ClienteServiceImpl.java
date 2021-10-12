package com.utnfrm.services;

import com.utnfrm.entities.Cliente;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClienteServiceImpl extends BaseServiceImpl<Cliente, Long> implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public ClienteServiceImpl(BaseRepository<Cliente, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public Cliente buscarPorEmail(String email) throws Exception {
        try {
            Cliente clienteEncontrado = this.clienteRepository.buscarPorEmail(email);
            return clienteEncontrado;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
