package com.utnfrm.services;

import com.utnfrm.entities.Usuario;
import org.springframework.core.io.Resource;

public interface UsuarioService extends BaseService<Usuario, Long> {

    Resource verFoto(Long id) throws Exception;

    Usuario verificacionLogin(Usuario usuario) throws Exception;

    Usuario buscarPorEmail(String email) throws Exception;
}
