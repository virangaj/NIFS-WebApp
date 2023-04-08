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
public class MaintenanceRequestDTO  extends BaseDTO {

    private String documentNo;
    private String date;
    private String vehicleNo;
    private String workshop;
    private String cost;
    private String description;
    private String attachment;
    private String startMeterReading;
    private String endMeterReading;
    private String remark;

}
