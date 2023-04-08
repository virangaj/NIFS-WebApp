package com.nifs.backend.dto.procument;

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
public class QuotationSummaryDTO extends BaseDTO {

    private String documentNo;
    private String epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String fundType;
    private String date;
    private String quotationRequestNo;
    private String fileNo;
    private String srnNo;
    private String value;
    private String fund;
    private String project;
    private String remark;

}
