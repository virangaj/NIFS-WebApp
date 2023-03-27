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
public class VehicleMaintenanceDTO  extends BaseDTO {

    private String documentNo;
    private String invoiceNo;
    private String vehicleNo;
    private String meter;
    private String workshop;
    private String cost;
    private String date;
    private String invoiceDate;
    private String location;
    private String remark;
}
