package com.nifs.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name="venue_charges")
@AllArgsConstructor
@NoArgsConstructor
public class VenueCharge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "venue_id", referencedColumnName = "venue_id", nullable = false)
    private VenueMaster venueMaster;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "charge_id", referencedColumnName = "charge_id", nullable = false)
    private Charges chargeId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;

    public VenueCharge(VenueMaster venueMaster, Charges chargeId, Date dateCreated) {

        this.venueMaster = venueMaster;
        this.chargeId = chargeId;
        this.dateCreated = dateCreated;
    }

}
