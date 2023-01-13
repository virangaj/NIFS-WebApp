package com.nifs.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.model.DivisionMaster;
import com.nifs.backend.model.EmployeeCategory;
import com.nifs.backend.model.DesignationMaster;
import com.nifs.backend.model.EmployeeMaster;
import com.nifs.backend.model.EmployeeTypeMaster;
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
    @OneToMany(mappedBy = "location", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("location")
    private List<DesignationMaster> designations;

    //division
    @OneToMany(mappedBy = "location", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("location")
    private List<DivisionMaster> divisions;


    //employee category
    @OneToMany(mappedBy = "location", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("location")
    private List<EmployeeCategory> empCategory;

    //employee type
    @OneToMany(mappedBy = "location", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("location")
    private List<EmployeeTypeMaster> empType;

    //employee
    @OneToMany(mappedBy = "location", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("location")
    private List<EmployeeMaster> employee;

}
