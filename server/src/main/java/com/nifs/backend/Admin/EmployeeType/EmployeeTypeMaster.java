package com.nifs.backend.Admin.EmployeeType;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;

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


}
