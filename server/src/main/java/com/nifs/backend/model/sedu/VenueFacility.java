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

@Entity
@Getter
@Setter
@Table(name="venue_facility")
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class VenueFacility extends Base {

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "venue_id",referencedColumnName = "venue_id")
    private VenueMaster venueMasterId;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "facility_id", referencedColumnName = "facility_id")
    private Facility facilityId;


}
