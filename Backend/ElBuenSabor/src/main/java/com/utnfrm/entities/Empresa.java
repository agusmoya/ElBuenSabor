package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "empresas")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Empresa extends Base {

    @Column
    private String nombre;

    @Column
    private String descripcion;

    @Column
    private String email;

    @Column
    private String telefono;

    @Column
    private int cantidadEmpleados;

    @Column
    private String tokenMercadoPago;
}
