package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Objects;

@Entity
@Table(name = "provincias")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Provincia extends Base {

    @Column
    @NotEmpty
    private String nombre;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Provincia provincia = (Provincia) o;
        return nombre.equals(provincia.nombre);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nombre);
    }
}
