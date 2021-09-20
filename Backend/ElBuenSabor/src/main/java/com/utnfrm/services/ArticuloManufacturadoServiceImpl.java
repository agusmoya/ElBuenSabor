package com.utnfrm.services;

import com.utnfrm.entities.ArticuloManufacturado;
import com.utnfrm.entities.Rol;
import com.utnfrm.repositories.ArticuloManufacturadoRepository;
import com.utnfrm.repositories.BaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ArticuloManufacturadoServiceImpl extends BaseServiceImpl<ArticuloManufacturado, Long> implements ArticuloManufacturadoService {

    @Autowired
    private ArticuloManufacturadoRepository articuloManufacturadoRepository;

    public ArticuloManufacturadoServiceImpl(BaseRepository<ArticuloManufacturado, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public Resource verFoto(Long id) throws Exception {
        try {
            Optional<ArticuloManufacturado> optionalArtManuf = articuloManufacturadoRepository.findById(id);
            ArticuloManufacturado artManuf = optionalArtManuf.get();
            if (artManuf.getImagen() == null) {
                throw new Exception();
            }
            Resource imagen = new ByteArrayResource(artManuf.getImagen());
            return imagen;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
