package com.nifs.backend.SEDU.Facility;

import jakarta.persistence.*;

@Entity
@Table(name="venue_facility")
public class Facility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;
    @Column(name="facility_id")
    private String facility_id;

    @Column(name = "facility_name")
    private String name;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFacilityId() {
        return facility_id;
    }

    public void setFacilityId(String facilityId) {
        this.facility_id = facilityId;
    }

    public String getFacilityName() {
        return name;
    }

    public void setFacilityName(String facilityName) {
        this.name = facilityName;
    }
}
