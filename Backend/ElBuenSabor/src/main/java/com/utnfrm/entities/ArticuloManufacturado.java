package com.utnfrm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "articulosManufacturados")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class ArticuloManufacturado extends Base {

    @Column
    @NotNull
    private Integer tiempoEstimadoCocina;

    @Column(unique = true)
    @NotNull
    private String denominacion;

    @Column
    @NotNull
    private Double precioVenta;

    @Lob
    @JsonIgnore
    private byte[] imagen;

    @ManyToOne(optional = false)
    @JoinColumn(name = "fk_rubro_general")
    @NotNull
    private RubroGeneral rubroGeneral;

    @OneToMany(cascade = CascadeType.MERGE)
    @NotEmpty
    private List<ArticuloManufacturadoDetalle> detallesArticuloManufacturado = new ArrayList<>();

    public Integer getImagenHashCode() {
        return (this.imagen != null) ? this.imagen.hashCode() : null;
    }
}
