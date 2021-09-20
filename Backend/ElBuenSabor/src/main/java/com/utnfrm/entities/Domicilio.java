package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "domicilios")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Domicilio extends Base {

    @Column
    private String calle;

    @Column
    private int numero;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_localidad")
    private Localidad localidad;
}
