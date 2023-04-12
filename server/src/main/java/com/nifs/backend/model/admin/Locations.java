package com.nifs.backend.model.admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nifs.backend.model.common.ProjectMaster;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "locations_master")
public class Locations {

    @Id
    @Column(name = "location_id", nullable = false, length = 10)
    private String locationId;

    @Column(name = "location_name", length = 100)
    private String locationName;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "tel_no", length = 15)
    private String telNo;

    @Column(name = "fax_no", length = 15)
    private String faxNo;



    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_updated")
    private Date dateUpdated;

//    relationships
    //designation
    @JsonIgnore
    @OneToMany(mappedBy = "locationId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<DesignationMaster> designations;

    //division
    @JsonIgnore
    @OneToMany(mappedBy = "locationId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<DivisionMaster> divisions;


    //employee category
    @JsonIgnore
    @OneToMany(mappedBy = "locationId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<EmployeeCategory> empCategory;

    //employee type

    @JsonIgnore
    @OneToMany(mappedBy = "locationId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<EmployeeTypeMaster> empType;

    //employee
    @JsonIgnore
    @OneToMany(mappedBy = "locationId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<EmployeeMaster> employee;

    @JsonIgnore
    @OneToMany(mappedBy = "locationId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<ProjectMaster> projects;

}
