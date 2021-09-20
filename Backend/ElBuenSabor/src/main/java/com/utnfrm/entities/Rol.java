package com.utnfrm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Rol extends Base {

    @Column(unique = true)
    @NotEmpty
    private String denominacion;

    @Lob
    @JsonIgnore
    private byte[] imagen;

    // todo metodo get se va a serializar en el json como un atributo más
    // y necesitamos el haschode de la foto en el front
    public Integer getImagenHashCode() {
        return (this.imagen != null) ? this.imagen.hashCode() : null;
    }

}
