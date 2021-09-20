package com.utnfrm.repositories;

import com.utnfrm.entities.Factura;
import org.springframework.stereotype.Repository;

@Repository
public interface FacturaRepository extends BaseRepository<Factura, Long> {
}
