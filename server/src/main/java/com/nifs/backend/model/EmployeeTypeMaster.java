package com.nifs.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "employee_type_master")
public class EmployeeTypeMaster {

    @Id
    @Column(name = "emp_type_id", nullable = false, length = 10)
    private String empTypeId;

    @Column(name = "type_name", nullable = false, length = 100)
    private String typeName;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_created")
    private Date dateCreated;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="date_updated")
    private Date dateUpdated;


//    relations

    //locations
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    private Locations locationId;

    //employee
    @JsonIgnore
    @OneToMany(mappedBy = "empTypeId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<EmployeeMaster> employee;

    public EmployeeTypeMaster(String EmpTypeId, String typeName, Date dateCreated, Locations locationId) {
        this.empTypeId = EmpTypeId;
        this.typeName = typeName;
        this.dateCreated = dateCreated;
        this.locationId = locationId;
    }
}
