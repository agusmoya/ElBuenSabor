package com.utnfrm.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Base implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    @Column(nullable = false)
    @ColumnDefault("1")
    protected int estado = 1;

    @Column(updatable = false)
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column
    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedAt;
}
