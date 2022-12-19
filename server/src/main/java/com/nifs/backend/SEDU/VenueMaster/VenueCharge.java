package com.nifs.backend.SEDU.VenueMaster;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nifs.backend.SEDU.Charges.Charges;
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
    private Charges charge;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;

    public VenueCharge(VenueMaster venueMaster, Charges charge, Date dateCreated) {

        this.venueMaster = venueMaster;
        this.charge = charge;
        this.dateCreated = dateCreated;
    }

}
