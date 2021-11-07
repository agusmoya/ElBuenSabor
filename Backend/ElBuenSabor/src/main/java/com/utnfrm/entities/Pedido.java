package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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
    private Long numero;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "estados_pedidos",
            joinColumns = @JoinColumn(name = "pedido_id"),
            inverseJoinColumns = @JoinColumn(name = "estado_id")
    )
    private List<EstadoPedido> estadosPedido = new ArrayList<>();

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
    // corregido quitando ALL por MERGE
    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "fk_domicilio")
    private Domicilio domicilio;


}
