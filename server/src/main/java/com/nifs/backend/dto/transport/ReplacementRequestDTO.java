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
public class ReplacementRequestDTO extends BaseDTO {

    private String documentNo;
    private String vehicleNo;
    private String driver;
    private String category;
    private String amount;
    private String brand;
    private String attachment;
    private String date;
    private String startMeterReading;
    private String endMeterReading;
    private String remark;

}
