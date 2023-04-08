package com.nifs.backend.model.sedu;


import com.nifs.backend.model.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Table(name="venue_charges_master")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Charges {



    @Id
    @Column(name="charge_id", length = 10, nullable = false)
    private String chargeId;

    @Column(name="name", length = 50)
    private String name;

    @Column(name="charge")
    private double charge;

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


//    relationships
//    @ManyToMany(mappedBy = "charges", fetch = FetchType.LAZY)
//    @JsonIgnore
//    private Set<VenueMaster> venues;

    @OneToMany(mappedBy = "chargeId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<VenueCharge> venueCharges;


//    getter and setter

}

