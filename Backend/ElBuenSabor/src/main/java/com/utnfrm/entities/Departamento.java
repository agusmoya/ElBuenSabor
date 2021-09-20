package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "departamentos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Departamento extends Base {


    @Column
    private String nombre;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_provincia")
    private Provincia provincia;

}
