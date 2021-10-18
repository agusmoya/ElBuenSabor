package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "domicilios")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Domicilio extends Base {

    @Column
    @NotEmpty
    private String calle;

    @Column
    @NotEmpty
    private int numero;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_localidad")
    @NotNull
    private Localidad localidad;
}
