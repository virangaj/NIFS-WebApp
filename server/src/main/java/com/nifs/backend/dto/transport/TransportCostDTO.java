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
public class TransportCostDTO extends BaseDTO {


    private String documentNo;
    private String epfNo;
    private int hod;
    private String designationId;
    private String divisionId;
    private String project;
    private String tourDate;
    private String sourceOfFunding;
    private String modeOfTravel;
    private String vehicleType;
    private String driverName;
    private String vehicleNo;
    private float estimatedKM;
    private float ratePerKM;
    private float totalCost;
    private float startReading;
    private float endReading;
    private String remark;


}
