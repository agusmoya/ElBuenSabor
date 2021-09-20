package com.utnfrm.entities;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "estadosPedido")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class EstadoPedido extends Base {

    @Column(unique = true)
    private String denominacion;

}
