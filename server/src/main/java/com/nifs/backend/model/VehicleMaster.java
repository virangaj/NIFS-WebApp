package com.nifs.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="vehicle_master")
public class VehicleMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "registration_no", nullable = false)
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

    @Column(name = "catergory")
    private String catergory;

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

    public VehicleMaster(String chassiNo, String engineNo, String date, String pool, String employee, String catergory, String brand, String color, String availability, String insuranceCompanyName, String emissionTestDate, String insuranceExpiryDate, String licenseExpiryDate, String remarks) {
        this.chassiNo = chassiNo;
        this.engineNo = engineNo;
        this.date = date;
        this.pool = pool;
        this.employee = employee;
        this.catergory = catergory;
        this.brand = brand;
        this.color = color;
        this.availability = availability;
        this.insuranceCompanyName = insuranceCompanyName;
        this.emissionTestDate = emissionTestDate;
        this.insuranceExpiryDate = insuranceExpiryDate;
        this.licenseExpiryDate = licenseExpiryDate;
        this.remarks = remarks;
    }
}
