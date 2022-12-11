package com.nifs.backend.SEDU.VenueLocation;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "venue_locations_master")
public class VenueLocation {

    @Id
    @Column(name = "location_id", nullable = false, length = 10)
    private String locationId;

    @Column(name = "location_name", nullable = false, length = 100)
    private String locationName;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;
}
