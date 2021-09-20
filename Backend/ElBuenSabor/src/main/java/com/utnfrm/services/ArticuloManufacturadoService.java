package com.utnfrm.services;

import com.utnfrm.entities.ArticuloManufacturado;
import org.springframework.core.io.Resource;

public interface ArticuloManufacturadoService extends BaseService<ArticuloManufacturado, Long> {

    Resource verFoto(Long id) throws Exception;
}
