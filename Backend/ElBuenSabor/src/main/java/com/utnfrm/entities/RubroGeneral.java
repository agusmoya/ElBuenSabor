package com.utnfrm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "rubrosGenerales")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class RubroGeneral extends Base {

    @Column(unique = true)
    private String denominacion;

    @Lob
    @JsonIgnore
    private byte[] imagen;

    public Integer getImagenHashCode() {
        return (this.imagen != null) ? this.imagen.hashCode() : null;
    }
}
