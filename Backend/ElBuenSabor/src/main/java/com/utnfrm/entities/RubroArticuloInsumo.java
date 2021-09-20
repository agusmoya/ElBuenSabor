package com.utnfrm.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rubrosArticulosInsumo")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class RubroArticuloInsumo extends Base {

    @Column(unique = true)
    @NotEmpty
    private String denominacion;

    @JsonIgnoreProperties(value = {"rubrosHijos", "handler", "hibernateLazyInitializer"})
    @ManyToOne(fetch = FetchType.LAZY)
    private RubroArticuloInsumo rubroPadre;

    @JsonIgnoreProperties(value = {"rubroPadre", "handler", "hibernateLazyInitializer"}, allowSetters = true)
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "rubroPadre")
    private List<RubroArticuloInsumo> rubrosHijos = new ArrayList<>();
}
