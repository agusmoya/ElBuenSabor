package com.utnfrm.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.envers.Audited;

import javax.persistence.*;

@Entity
@Table(name = "provincias")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
//@Audited
public class Provincia extends Base {

    @Column
    private String nombre;
}
