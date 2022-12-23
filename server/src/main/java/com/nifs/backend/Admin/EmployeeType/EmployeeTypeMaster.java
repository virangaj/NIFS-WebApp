package com.nifs.backend.Admin.EmployeeType;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.Admin.EmployeeMaster.EmployeeMaster;
import com.nifs.backend.Admin.Locations.Locations;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

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


}
