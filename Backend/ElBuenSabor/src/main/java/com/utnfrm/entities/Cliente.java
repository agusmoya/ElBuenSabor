package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Objects;

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

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_usuario")
    @NotNull
    private Usuario usuario;

    @OneToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_domicilio")
    @NotNull
    private Domicilio domicilio;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Cliente cliente = (Cliente) o;
        return telefono.equals(cliente.telefono) && email.equals(cliente.email) && usuario.equals(cliente.usuario);
    }

    @Override
    public int hashCode() {
        return Objects.hash(telefono, email, usuario);
    }
}
