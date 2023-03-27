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
public class VehicleRepairDTO extends BaseDTO {

    private String documentNo;
    private String vehicleNo;
    private String invoiceNo;
    private String vehicleType;
    private String workshop;
    private String description;
    private String date;
    private String invoiceDate;
    private String repairStartDate;
    private String repairEndDate;
    private String meterReading;
    private String repairType;
    private String repairCost;
    private String location;
    private String remark;

}
