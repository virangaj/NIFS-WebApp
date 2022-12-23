package com.nifs.backend.Admin.EmployeeDesignation;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.Admin.EmployeeMaster.EmployeeMaster;
import com.nifs.backend.Admin.Locations.Locations;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;


import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "designation_master")
public class DesignationMaster {

    @Id
    @Column(name = "id", nullable = false, length = 10)
    private String id;

    @Column(name = "designation_name", length = 255)
    private String designationName;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_updated")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date dateUpdated;


    //relationships

    //locations
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    @JsonIgnoreProperties("designations")
    private Locations location;

    //employee
    @OneToMany(mappedBy = "designation", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("designation")
    private List<EmployeeMaster> employee;

}
