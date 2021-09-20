package com.utnfrm.services;

import com.utnfrm.entities.RubroGeneral;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.RubroGeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class RubroGeneralServiceImpl extends BaseServiceImpl<RubroGeneral, Long> implements RubroGeneralService {

    @Autowired
    private RubroGeneralRepository rubroGeneralRepository;

    public RubroGeneralServiceImpl(BaseRepository<RubroGeneral, Long> baseRepository) {
        super(baseRepository);
    }

    @Override
    @Transactional
    public Resource verFoto(Long id) throws Exception {
        try {
            Optional<RubroGeneral> optionalRubro = rubroGeneralRepository.findById(id);
            RubroGeneral rubroGeneral = optionalRubro.get();
            if (rubroGeneral.getImagen() == null) {
                throw new Exception();
            }
            Resource imagen = new ByteArrayResource(rubroGeneral.getImagen());
            return imagen;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
