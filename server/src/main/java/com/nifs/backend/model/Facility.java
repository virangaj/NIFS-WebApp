package com.nifs.backend.model;

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

@Entity
@Table(name="venue_facility_master")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Facility {


    @Id
    @Column(name="facility_id", nullable = false, length = 10)
    private String facilityId;

    @Column(name = "facility_name",  nullable = false, length = 50)
    private String name;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;




//    relationships
//    @JsonBackReference
    @ManyToMany(mappedBy = "facilities", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<VenueMaster> venues;


}
