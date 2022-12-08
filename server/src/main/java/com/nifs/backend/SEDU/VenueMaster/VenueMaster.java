package com.nifs.backend.SEDU.VenueMaster;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.nifs.backend.SEDU.Charges.Charges;
import com.nifs.backend.SEDU.Facility.Facility;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name="venue_master")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VenueMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "venue_id", nullable = false, length = 10)
    private String venueId;
    @Column(name = "name", nullable = false, length = 255)
    private String venueName;
    @Column(name = "type", nullable = false, length = 50)
    private String type;
    @Column(name="Capacity", nullable = false)
    private int capacity;

    @Column(name="remark", nullable = false, length = 255)
    private String remark;

    @Column(name="location", nullable = false, length = 50)
    private String location;

    @Column(name="availability", nullable = false, length = 255)
    private String availability;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;




//    relationships
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinTable(name = "venue_charges",
        joinColumns = {
                @JoinColumn(name = "venue_id", referencedColumnName = "venue_id")
        },
        inverseJoinColumns = {
                @JoinColumn(name="charge_id", referencedColumnName = "charge_id")
        }
    )
    private Set<Charges> charges;


    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinTable(name = "venue_facility",
        joinColumns = {
            @JoinColumn(name = "venue_id", referencedColumnName = "venue_id"),
        },
        inverseJoinColumns = {
            @JoinColumn(name = "facility_id", referencedColumnName = "facility_id")
        }
    )
//    @JsonManagedReference
    private Set<Facility> facilities;


//getter and setter
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;

    }


    public String getVenueId() {
        return venueId;
    }

    public void setVenueId(String venueId) {
        this.venueId = venueId;
    }

    public String getVenueName() {
        return venueName;
    }

    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }
}
