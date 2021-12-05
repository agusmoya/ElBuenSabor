package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pedidos")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Pedido extends Base {

    @Column
    private Date fecha;

    @Column
    private Long numero = 1L;

    // cascade = CascadeType.ALL
    //    @ManyToMany(cascade = CascadeType.ALL)
    //    @JoinTable(
    //            name = "estados_pedidos",
    //            joinColumns = @JoinColumn(name = "pedido_id"),
    //            inverseJoinColumns = @JoinColumn(name = "estado_id")
    //    )
    //    private List<EstadoPedido> estadosPedido = new ArrayList<>();

    @ManyToOne(optional = false, cascade = CascadeType.MERGE)
    @JoinColumn(name = "fk_estado_pedido")
    @NotNull
    private EstadoPedido estadoPedido;

    @Column
    private Date horaEstimadaFin;

    @Column
    private int tipoEnvio;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_mercado_pago_datos")
    private MercadoPagoDatos mercadoPagoDatos;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_factura")
    private Factura factura;

    @OneToMany(cascade = CascadeType.ALL)
    private List<DetallePedido> detallesPedido = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "fk_cliente")
    private Cliente cliente;

    // detached entity passed to persist: com.utnfrm.entities.Domicilio;
    // corregido quitando ALL por MERGE: cascade = CascadeType.MERGE
    @OneToOne
    @JoinColumn(name = "fk_domicilio")
    private Domicilio domicilio;


}
