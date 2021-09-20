package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "sucursales")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Sucursal extends Base {

    @Column(unique = true)
    private String denominacion;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_empresa")
    private Empresa empresa;
}
