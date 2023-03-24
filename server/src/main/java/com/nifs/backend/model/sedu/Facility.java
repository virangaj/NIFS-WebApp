package com.nifs.backend.model.sedu;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name="venue_facility_master")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Facility {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private Integer id;

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
