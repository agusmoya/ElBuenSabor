package com.utnfrm.services;

import com.utnfrm.entities.ArticuloInsumo;
import com.utnfrm.entities.RubroArticuloInsumo;
import com.utnfrm.repositories.ArticuloInsumoRepository;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.RubroArticuloInsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ArticuloInsumoServiceImpl extends BaseServiceImpl<ArticuloInsumo, Long> implements ArticuloInsumoService {

    @Autowired
    private ArticuloInsumoRepository articuloInsumoRepository;

    @Autowired
    private RubroArticuloInsumoRepository rubroArticuloInsumoRepository;

    public ArticuloInsumoServiceImpl(BaseRepository<ArticuloInsumo, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public List<RubroArticuloInsumo> findAllRubrosInsumo() throws Exception {
        try {
            List<RubroArticuloInsumo> rubrosArticuloInsumo = rubroArticuloInsumoRepository.findAll();
            return rubrosArticuloInsumo;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    @org.springframework.transaction.annotation.Transactional
    public Resource verFoto(Long id) throws Exception {
        try {
            Optional<ArticuloInsumo> optionalArtInsumo = articuloInsumoRepository.findById(id);
            ArticuloInsumo artInsumo = optionalArtInsumo.get();
            if (artInsumo.getImagen() == null) {
                throw new Exception();
            }
            Resource imagen = new ByteArrayResource(artInsumo.getImagen());
            return imagen;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
