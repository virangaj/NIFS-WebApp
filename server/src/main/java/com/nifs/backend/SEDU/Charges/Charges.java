package com.nifs.backend.SEDU.Charges;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.SEDU.VenueMaster.VenueMaster;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name="venue_charges_master")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Charges {


//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private int id;

    @Id
    @Column(name="charge_id", length = 10, nullable = false)
    private String chargeId;

    @Column(name="name", length = 50, nullable = false)
    private String name;

    @Column(name="charge")
    private double charge;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;

//    relationships
    @ManyToMany(mappedBy = "charges", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<VenueMaster> venues;



//    getter and setter

}

