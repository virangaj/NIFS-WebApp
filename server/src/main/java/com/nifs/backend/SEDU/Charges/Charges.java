package com.nifs.backend.sedu.Charges;


import com.nifs.backend.sedu.VenueMaster.VenueCharge;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

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

    @Column(name="name", length = 50)
    private String name;

    @Column(name="charge")
    private double charge;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_updated")
    private Date dateUpdated;

//    relationships
//    @ManyToMany(mappedBy = "charges", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private Set<VenueMaster> venues;

    @OneToMany(mappedBy = "charge", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<VenueCharge> venueCharges;


//    getter and setter

}

