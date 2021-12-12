package com.utnfrm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = "usuarios")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Usuario extends Base {

    @Column(unique = true)
    @NotEmpty
    @Email()//message = "El email debe tener un formato correcto"
    private String nombre; // email-usuario

    @Column
    @NotEmpty
    private String clave;

    @ManyToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "fk_rol")
    @NotNull
    private Rol rol;

    @Lob
    @JsonIgnore
    private byte[] imagen;

    public Integer getImagenHashCode() {
        return (this.imagen != null) ? this.imagen.hashCode() : null;
    }

}
