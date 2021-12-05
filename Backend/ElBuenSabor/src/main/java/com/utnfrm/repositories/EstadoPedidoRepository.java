package com.utnfrm.repositories;

import com.utnfrm.entities.EstadoPedido;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoPedidoRepository extends BaseRepository<EstadoPedido, Long> {

    EstadoPedido findByDenominacion(String denominacion);
}
