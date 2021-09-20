package com.utnfrm.services;

import com.utnfrm.entities.RubroArticuloInsumo;
import com.utnfrm.repositories.BaseRepository;
import com.utnfrm.repositories.RubroArticuloInsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RubroArticuloInsumoServiceImpl extends BaseServiceImpl<RubroArticuloInsumo, Long> implements RubroArticuloInsumoService {

    @Autowired
    private RubroArticuloInsumoRepository rubroArticuloInsumoRepository;

    public RubroArticuloInsumoServiceImpl(BaseRepository<RubroArticuloInsumo, Long> baseRepository) {
        super(baseRepository);
    }
}
