package com.nifs.backend.SEDU.VenueMaster;

import jakarta.persistence.*;

@Entity
@Table(name="venue_master")
public class VenueMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name = "venue_id")
    private String venueId;
    @Column(name = "name")

    private String name;
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



//    relationships


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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
}
