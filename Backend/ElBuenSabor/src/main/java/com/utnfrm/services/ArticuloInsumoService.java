package com.utnfrm.services;

import com.utnfrm.entities.ArticuloInsumo;
import com.utnfrm.entities.RubroArticuloInsumo;
import org.springframework.core.io.Resource;

import java.util.List;

public interface ArticuloInsumoService extends BaseService<ArticuloInsumo, Long> {

    public List<RubroArticuloInsumo> findAllRubrosInsumo() throws Exception;

    Resource verFoto(Long id) throws Exception;
}
