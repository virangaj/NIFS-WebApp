package com.nifs.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee_category_master")
public class EmployeeCategory {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private int id;

    @Id
    @Column(name = "employee_category_code", nullable = false, length = 10)
    private String empCatId;

    @Column(name = "description", length = 255)
    private String description;

    @Column(name = "ot_rate")
    private float otRate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_created")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_updated")
    private Date dateUpdated;

    //relationship

    //location
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    @JsonIgnoreProperties("empCategory")
    private Locations locationId;

    //employee
    @OneToMany(mappedBy = "empCatId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("empCategory")
    private List<EmployeeMaster> employee;

    //constructor for create instance

    public EmployeeCategory(String empCatId, String description, float otRate, Date dateCreated, Locations locationId) {
        this.empCatId = empCatId;
        this.description = description;
        this.otRate = otRate;
        this.dateCreated = dateCreated;
        this.locationId = locationId;
    }
}
