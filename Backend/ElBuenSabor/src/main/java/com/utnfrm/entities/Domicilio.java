package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = "domicilios")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Domicilio extends Base {

    @Column
    @NotEmpty
    private String calle;

    @Column
    @NotNull
    private Integer numero;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_localidad")
    @NotNull
    private Localidad localidad;

    // Generado a partir del IDE
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Domicilio domicilio = (Domicilio) o;
        return numero == domicilio.numero && calle.equals(domicilio.calle) && localidad.equals(domicilio.localidad);
    }

    @Override
    public int hashCode() {
        return Objects.hash(calle, numero, localidad);
    }
}


// Generado a partir de proyecto chileno
//    @Override
//    public boolean equals(Object obj) {
//        // son instancias iguales? (con el this aclaramos que buscamos una instancia de esta clase, Domicilio.
//        if (this == obj) return true;
//        //si no son instancias iguales, preguntamos si el obj es una instancia de Domicilio
//        if (!(obj instanceof Domicilio)) {
//            return false;
//        }
//        Domicilio e = (Domicilio) obj;
//        // el null no se compara con equals porque
//        // no "hay nada que comparar", por eso es con != ó == .
//        return this.id != null && this.id.equals(e.getId());
//    }

// Generado a partir de @EqualAndHashCode annotation
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
//        Domicilio domicilio = (Domicilio) o;
//        return id != null && Objects.equals(id, domicilio.id);
//    }
//
//    @Override
//    public int hashCode() {
//        return getClass().hashCode();
//    }

