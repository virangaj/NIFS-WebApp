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
public class VehicleReplacementDTO extends BaseDTO {

    private String documentNo;
    private String invoiceNo;
    private String itemName;
    private String meterReading;
    private String placeOfPurchase;
    private String cost;
    private String date;
    private String invoiceDate;
    private String vehicleNo;
    private String category;
    private String location;
    private String manufacturer;
    private String description;
    private String remark;
}
