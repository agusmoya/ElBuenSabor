package com.utnfrm.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@DynamicUpdate
@Table(name = "estadosPedido")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class EstadoPedido extends Base {

    @Column
    private String denominacion;

    @Override
    public boolean equals(Object obj) {
        // son instancias iguales? (con el this aclaramos que buscamos una instancia de esta clase, EstadoPedidos.
        if (this == obj) {
            return true;
        }
        //si no son instancias iguales, preguntamos si el obj es una instancia de EstadoPedido
        if (!(obj instanceof EstadoPedido)) {
            return false;
        }
        EstadoPedido e = (EstadoPedido) obj;
        // el null no se compara con equals porque
        // no "hay nada que comparar", por eso es con != ó == .
        return this.id != null && this.id.equals(e.getId());
    }
}
