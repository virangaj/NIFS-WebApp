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
    @Column(name = "venue_id")
    private String venueId;
    @Column(name = "name")
    private String venueName;
    @Column(name = "type")

    private String type;
    @Column(name="Capacity")
    private int capacity;

    @Column(name="remark")
    private String remark;

    @Column(name="location")
    private String location;

    @Column(name="availability")
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
