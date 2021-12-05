package com.utnfrm.repositories;

import com.utnfrm.entities.EstadoPedido;
import com.utnfrm.entities.Pedido;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepository extends BaseRepository<Pedido, Long> {

    @Query(value = "SELECT MAX(p.numero) FROM Pedido p")
    Long obtenerUltimoNroPedido();

}
