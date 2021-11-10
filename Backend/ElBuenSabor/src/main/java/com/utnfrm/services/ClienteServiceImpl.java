package com.utnfrm.services;

import com.utnfrm.entities.Cliente;
import com.utnfrm.entities.Rol;
import com.utnfrm.entities.Usuario;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.ClienteRepository;
import org.apache.commons.codec.digest.DigestUtils;
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
    public Cliente save(Cliente cliente) throws Exception {
        String encriptMD5 = DigestUtils.md5Hex(cliente.getUsuario().getClave());
        cliente.getUsuario().setClave(encriptMD5);
        return super.save(cliente);
    }

    @Override
    @Transactional
    public Cliente update(Long id, Cliente cliente) throws Exception {
        String encriptMD5 = DigestUtils.md5Hex(cliente.getUsuario().getClave());
        cliente.getUsuario().setClave(encriptMD5);
        return super.update(id, cliente);
    }

    @Override
    @Transactional
    public Cliente buscarPorEmail(String email) throws Exception {
        try {
            return this.clienteRepository.buscarPorEmail(email);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
