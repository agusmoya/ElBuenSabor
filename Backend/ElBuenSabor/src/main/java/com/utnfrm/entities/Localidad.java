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
@Table(name = "localidades")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Localidad extends Base {

    @Column
    @NotEmpty
    private String nombre;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_departamento")
    @NotNull
    private Departamento departamento;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Localidad localidad = (Localidad) o;
        return nombre.equals(localidad.nombre) && departamento.equals(localidad.departamento);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nombre, departamento);
    }
}
