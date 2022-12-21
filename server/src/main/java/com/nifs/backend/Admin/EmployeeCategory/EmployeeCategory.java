package com.nifs.backend.Admin.EmployeeCategory;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.Admin.Locations.Locations;
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
    private String employeeCategoryId;

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
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    @JsonIgnoreProperties("empCategory")
    private Locations location;


}
