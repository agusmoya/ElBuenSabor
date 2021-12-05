package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "facturas")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Factura extends Base {

    @Column
    private Date fecha;

    @Column
    private Long numero;

    @Column
    private Double montoDescuento;

    @Column
    private String nroTarjeta;

    @ManyToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "fk_forma_pago")
    private FormaPago formaPago;

    // esta relacion crea una 3er tabla "factura_detalle_factura" con factura_id y detalle_id
    @OneToMany(cascade = CascadeType.ALL)
    private List<DetalleFactura> detallesFactura = new ArrayList<>();

}
