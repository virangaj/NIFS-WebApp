package com.nifs.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@MappedSuperclass
public class Base {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id", nullable = false)
    private int id ;
    @Column(name = "CreatedOn", nullable = false)
    @CreationTimestamp
    private Date createdOn;
    @Column(name = "ModifiedOn")
    @UpdateTimestamp
    private Date modifiedOn;
    @Column(name = "IsDeleted")
    private boolean isDeleted;
    @Column(name = "CreatedBy", nullable = false)
    private Integer createdBy;
    @Column(name = "ModifiedBy")
    private Integer modifiedBy;

}
