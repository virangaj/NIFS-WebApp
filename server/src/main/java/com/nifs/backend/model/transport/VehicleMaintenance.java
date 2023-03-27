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
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "vehicle_maintenance")
public class VehicleMaintenance extends Base {

    private String documentNo;

    @Column(name = "invoice_no")
    private String invoiceNo;

    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Column(name = "meter")
    private String meter;

    @Column(name = "workshop")
    private String workshop;

    @Column(name = "cost")
    private String cost;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "invoice_date")
    private String invoiceDate;

    @Column(name = "location")
    private String location;

    @Column(name = "remark")
    private String remark;


}
