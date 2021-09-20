package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "clientes")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Cliente extends Base {

    @Column
    private String nombre;

    @Column
    private String apellido;

    @Column(unique = true)
    private Long telefono;

    @Column(unique = true)
    private String email;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_usuario")
    private Usuario usuario;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_domicilio")
    private Domicilio domicilio;
}
