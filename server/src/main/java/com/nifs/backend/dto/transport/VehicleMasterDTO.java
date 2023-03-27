package com.nifs.backend.dto.transport;


import com.nifs.backend.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class VehicleMasterDTO extends BaseDTO {

    private String registrationNo;
    private String chassiNo;
    private String engineNo;
    private String date;
    private String pool;
    private String employee;
    private String category;
    private String brand;
    private String color;
    private String availability;
    private String insuranceCompanyName;
    private String emissionTestDate;
    private String insuranceExpiryDate;
    private String licenseExpiryDate;
    private String remarks;
}
