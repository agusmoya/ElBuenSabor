package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "detallesFacturas")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class DetalleFactura extends Base {

    @Column
    private int cantidad;

    @Column
    private Double subtotal;

    @ManyToOne(optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_articulo_manufacturado")
    private ArticuloManufacturado articuloManufacturado;
}
