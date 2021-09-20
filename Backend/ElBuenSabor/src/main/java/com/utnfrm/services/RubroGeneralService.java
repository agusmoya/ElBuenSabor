package com.utnfrm.services;

import com.utnfrm.entities.RubroGeneral;
import org.springframework.core.io.Resource;

public interface RubroGeneralService extends BaseService<RubroGeneral, Long> {

    Resource verFoto(Long id) throws Exception;
}
