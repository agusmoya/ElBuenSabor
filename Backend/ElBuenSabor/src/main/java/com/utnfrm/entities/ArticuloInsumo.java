package com.utnfrm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "articulosInsumos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class ArticuloInsumo extends Base {

    @Column(unique = true)
    @NotEmpty
    private String denominacion;

    @Column
    @NotNull
    private Double precioCompra;

    @Column
    @NotNull
    private Double precioVenta;

    @Column
    @NotNull
    private Double stockActual;

    @Column
    @NotNull
    private Double stockMinimo;

    @Column
    @NotEmpty
    private String unidadMedida;

    @Column
    @NotNull(message = "Este campo es obligatorio")
    private Boolean esInsumo;

    // @ManyToOne(cascade = CascadeType.ALL)
    // @JoinColumn(name = "fk_rubro_articulo")
    // private RubroArticuloInsumo rubroArticulo;

    @JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer"})
    @ManyToOne(fetch = FetchType.LAZY)
//    @NotNull
    private RubroArticuloInsumo rubroPadre;

    @JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer"})
    @ManyToOne(fetch = FetchType.LAZY)
//    @NotNull
    private RubroArticuloInsumo rubroHijo;

    @Lob
    @JsonIgnore
    private byte[] imagen;

    public Integer getImagenHashCode() {
        return (this.imagen != null) ? this.imagen.hashCode() : null;
    }
}
