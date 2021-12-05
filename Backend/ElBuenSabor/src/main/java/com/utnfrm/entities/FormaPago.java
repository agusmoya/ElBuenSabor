package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "formasPago")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class FormaPago extends Base {

    @Column
    private String denominacion;
}
