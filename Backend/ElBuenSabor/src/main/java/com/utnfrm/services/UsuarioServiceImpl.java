package com.utnfrm.services;

import com.utnfrm.entities.Rol;
import com.utnfrm.entities.Usuario;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.RolRepository;
import com.utnfrm.repositories.UsuarioRepository;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UsuarioServiceImpl extends BaseServiceImpl<Usuario, Long> implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    public UsuarioServiceImpl(BaseRepository<Usuario, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public Usuario buscarPorEmail(String email) throws Exception {
        try {
            Usuario usuarioEncontrado = this.usuarioRepository.buscarPorEmail(email);
            return usuarioEncontrado;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Usuario save(Usuario usuario) throws Exception {
        String encriptMD5 = DigestUtils.md5Hex(usuario.getClave());
        usuario.setClave(encriptMD5);

        Rol rol = rolRepository.findByDenominacion(usuario.getRol().getDenominacion());
        if (rol != null) {
            rolRepository.save(rol);
        }
        return super.save(usuario);
    }

    @Override
    @Transactional
    public Usuario update(Long id, Usuario usuario) throws Exception {
        if (usuario.getClave().length() < 32) {
            String encriptMD5 = DigestUtils.md5Hex(usuario.getClave());
            usuario.setClave(encriptMD5);
        }

        Rol rol = rolRepository.findByDenominacion(usuario.getRol().getDenominacion());
        if (rol != null) {
            rolRepository.save(rol);
        }
        return super.update(id, usuario);
    }

    @Override
    @Transactional
    public Resource verFoto(Long id) throws Exception {
        try {
            Optional<Usuario> optionalUser = usuarioRepository.findById(id);
            Usuario usuario = optionalUser.get();
            if (usuario.getImagen() == null) {
                throw new Exception();
            }
            Resource imagen = new ByteArrayResource(usuario.getImagen());
            return imagen;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario verificacionLogin(Usuario usuario) throws Exception {
        try {
            Usuario usuarioEncontrado = usuarioRepository.buscarPorEmail(usuario.getNombre());

            if (usuarioEncontrado == null) {
                throw new Exception("Usuario no encontrado");
            } else if (usuario.getClave().length() >= 32) {
                if (usuarioEncontrado.getClave().equals(usuario.getClave())) {
                    return usuarioEncontrado;
                } else {
                    throw new Exception("Clave erronea");
                }
            } else {
                String encriptMD5 = DigestUtils.md5Hex(usuario.getClave());
                usuario.setClave(encriptMD5);
                if (usuarioEncontrado.getClave().equals(usuario.getClave())) {
                    return usuarioEncontrado;
                }
                throw new Exception("Clave erronea");
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }


}
