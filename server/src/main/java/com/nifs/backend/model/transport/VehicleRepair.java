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
@Table(name = "vehicle_repair")
public class VehicleRepair extends Base {

    private String documentNo;

    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Column(name = "invoice_no")
    private String invoiceNo;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @Column(name = "workshop")
    private String workshop;

    @Column(name = "description")
    private String description;

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


    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "repair_start_date")
    private String repairStartDate;


    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "repair_end_date")
    private String repairEndDate;

    @Column(name = "meter_reading")
    private String meterReading;

    @Column(name = "repair_type")
    private String repairType;

    @Column(name = "repair_cost")
    private String repairCost;

    @Column(name = "location")
    private String location;

    @Column(name = "remark")
    private String remark;

}
