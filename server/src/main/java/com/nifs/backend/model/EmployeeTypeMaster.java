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
@Table(name = "employee_type_master")
public class EmployeeTypeMaster {

    @Id
    @Column(name = "type_id", nullable = false, length = 10)
    private String typeId;

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
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    @JsonIgnoreProperties("empType")
    private Locations location;

    //employee
    @OneToMany(mappedBy = "empType", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("empType")
    private List<EmployeeMaster> employee;

    public EmployeeTypeMaster(String typeId, String typeName, Date dateCreated, Locations location) {
        this.typeId = typeId;
        this.typeName = typeName;
        this.dateCreated = dateCreated;
        this.location = location;
    }
}
