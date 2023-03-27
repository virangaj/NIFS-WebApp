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
@Table(name="vehicle_master")
public class VehicleMaster extends Base {


    private String registrationNo;


    @Column(name="chassi_no")
    private String chassiNo;

    @Column(name="engine_no")
    private String engineNo;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;

    @Column(name = "pool")
    private String pool;

    @Column(name="employee")
    private String employee;

    @Column(name = "category")
    private String category;

    @Column(name = "brand")
    private String brand;

    @Column(name = "color")
    private String color;

    @Column(name = "availability")
    private String availability;

    @Column(name="insurance_Company_Name")
    private String insuranceCompanyName;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column( name = "emission_test_date")
    private String emissionTestDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "insurance_expiry_date")
    private String insuranceExpiryDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "license_expiry_date")
    private String licenseExpiryDate;

    @Column(name = "remark")
    private String remarks;


}
