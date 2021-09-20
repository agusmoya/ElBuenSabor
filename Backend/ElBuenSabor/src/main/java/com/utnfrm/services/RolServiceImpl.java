package com.utnfrm.services;

import com.utnfrm.entities.Rol;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RolServiceImpl extends BaseServiceImpl<Rol, Long> implements RolService {

    @Autowired
    private RolRepository rolRepository;

    public RolServiceImpl(BaseRepository<Rol, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public Resource verFoto(Long id) throws Exception {
        try {
            Optional<Rol> optionalRol = rolRepository.findById(id);
            Rol rol = optionalRol.get();
            if (rol.getImagen() == null) {
                throw new Exception();
            }
            Resource imagen = new ByteArrayResource(rol.getImagen());
            return imagen;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

//    public boolean validarCampoUnico(Rol rol) {
//        List<Rol> rolesBD = rolRepository.findAll();
//        for (Rol r : rolesBD) {
//            if (r.getDenominacion() == rol.getDenominacion()) return false;
//        }
//        return true;
//    }

}
