package com.nifs.backend.model.sedu;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="venue_master")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VenueMaster {

    @Id
    @Column(name = "venue_id", nullable = false, length = 10)
    private String venueId;
    @Column(name = "name", length = 255)
    private String venueName;
    @Column(name = "type", length = 50)
    private String type;
    @Column(name="Capacity")
    private int capacity;

    @Column(name="remark", length = 255)
    private String remark;

    @Column(name="location", length = 50)
    private String location;

    @Column(name="availability", length = 255)
    private String availability;

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


    //relationships
    @JsonIgnore
    @OneToMany(mappedBy = "venueMasterId")
    private List<VenueCharge> venueCharges;
    @JsonIgnore
    @OneToMany(mappedBy = "venueMasterId")
    private List<VenueFacility> venueFacilities;

    @JsonIgnore
    @OneToMany(mappedBy = "venueId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<EventRequest> eventRequests;


}
