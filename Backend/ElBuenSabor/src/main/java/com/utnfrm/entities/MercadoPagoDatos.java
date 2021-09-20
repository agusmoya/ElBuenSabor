package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "mercadopagodatos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class MercadoPagoDatos extends Base {

    @Column
    private Date fechaCreacion;

    @Column
    private Date fechaAprobacion;

    @Column
    private String formaPago;

    @Column
    private String metodoPago;

    @Column
    private String nroTarjeta;

}
