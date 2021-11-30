package com.utnfrm.services;

import com.utnfrm.entities.EstadoPedido;
import com.utnfrm.repositories.BaseRepository;
import org.springframework.stereotype.Service;

@Service
public class EstadoPedidoServiceImpl extends BaseServiceImpl<EstadoPedido, Long> implements EstadoPedidoService {

    public EstadoPedidoServiceImpl(BaseRepository<EstadoPedido, Long> baseRepository) {
        super(baseRepository);
    }
}
