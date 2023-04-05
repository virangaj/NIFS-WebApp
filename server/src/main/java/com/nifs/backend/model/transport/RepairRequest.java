package com.nifs.backend.model.transport;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nifs.backend.model.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "repair_request")
public class RepairRequest extends Base {

    private String documentNo;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;

    @Column(name = "employee_no")
    private String employeeNo;

    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Column(name = "designation")
    private String designation;

    @Column(name = "attachment")
    private String attachment;

    @Column(name = "division")
    private String division;

    @Column(name = "remarks")
    private String remarks;

}
