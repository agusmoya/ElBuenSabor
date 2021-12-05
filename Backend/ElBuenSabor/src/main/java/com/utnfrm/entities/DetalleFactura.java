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

    @ManyToOne
    @JoinColumn(name = "fk_articulo_manufacturado")
    private ArticuloManufacturado articuloManufacturado;

    @ManyToOne
    @JoinColumn(name = "fk_articulo_insumo")
    private ArticuloInsumo articuloInsumo;
}
