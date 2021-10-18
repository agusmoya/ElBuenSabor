package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "departamentos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Departamento extends Base {

    @Column
    @NotEmpty
    private String nombre;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_provincia")
    @NotNull
    private Provincia provincia;

}
