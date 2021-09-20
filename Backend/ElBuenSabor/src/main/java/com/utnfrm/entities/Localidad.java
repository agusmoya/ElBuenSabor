package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "localidades")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Localidad extends Base {

    @Column
    private String nombre;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_departamento")
    private Departamento departamento;
}
