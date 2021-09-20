package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "articulosManufacturadosDetalles")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class ArticuloManufacturadoDetalle extends Base {

    @Column
    @NotNull
    private Double cantidad;

    @Column
    @NotNull
    private String unidadMedida;

    @ManyToOne(optional = false)
    @JoinColumn(name = "fk_articulo_insumo")
    @NotNull
    private ArticuloInsumo articuloInsumo;
}
