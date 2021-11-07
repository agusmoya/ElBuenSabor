package com.utnfrm.repositories;

import com.utnfrm.entities.Pedido;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends BaseRepository<Pedido, Long> {

//    @Query(value = "SELECT ep FROM EstadoPedido ep WHERE ep.denominacion=:denominacion")
//    EstadoPedido buscarPorDenominacion(@Param("denominacion") String denominacion);
}
