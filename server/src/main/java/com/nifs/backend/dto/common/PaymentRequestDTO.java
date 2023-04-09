package com.nifs.backend.dto.common;

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
public class PaymentRequestDTO extends BaseDTO {

    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String date;
    private String description;
    private String remark;

    private int grossAmount;
    private int friegthCharge;
    private int clearingCharge;
    private int directorGeneralCharge;
    private int customCharge;
    private int courierCharge;
    private int airLineCharge;
    private int handlingCharge;
    private int insurance;
    private int otherCharge;
}
