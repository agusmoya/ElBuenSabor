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
}
