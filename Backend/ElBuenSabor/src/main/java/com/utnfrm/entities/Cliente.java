package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "clientes")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Cliente extends Base {

    @Column
    @NotEmpty
    private String nombre;

    @Column
    @NotEmpty
    private String apellido;

    @Column(unique = true)
    @NotNull
    private Long telefono;

    @Column(unique = true)
    @NotEmpty
    private String email;

    // optional = false, cascade = CascadeType.ALL
    // SOLUCIONA **detached entity passed to persist: com.utnfrm.entities.Usuario; nested exception is org.hibernate.PersistentObjectException**
    @OneToOne()
    @JoinColumn(name = "fk_usuario")
    @NotNull
    private Usuario usuario;

    @OneToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "fk_domicilio")
    @NotNull
    private Domicilio domicilio;
}
