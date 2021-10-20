package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "localidades")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Localidad extends Base {

    @Column
    @NotEmpty
    private String nombre;

    @ManyToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "fk_departamento")
    @NotNull
    private Departamento departamento;
}
