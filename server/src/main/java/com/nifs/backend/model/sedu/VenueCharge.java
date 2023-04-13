package com.nifs.backend.model.sedu;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nifs.backend.model.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name="venue_charges")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class VenueCharge extends Base {

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "venue_id", referencedColumnName = "venue_id")
    private VenueMaster venueMasterId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "charge_id", referencedColumnName = "charge_id")
    private Charges chargeId;


}
