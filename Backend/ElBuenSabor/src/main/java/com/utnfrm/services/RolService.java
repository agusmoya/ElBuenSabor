package com.utnfrm.services;

import com.utnfrm.entities.Rol;
import org.springframework.core.io.Resource;

public interface RolService extends BaseService<Rol, Long> {

    Resource verFoto(Long id) throws Exception;
}
