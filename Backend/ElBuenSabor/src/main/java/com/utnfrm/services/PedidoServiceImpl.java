package com.utnfrm.services;

import com.utnfrm.entities.Pedido;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServiceImpl extends BaseServiceImpl<Pedido, Long> implements PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    public PedidoServiceImpl(BaseRepository<Pedido, Long> baseRepository) {
        super(baseRepository);
    }
}
