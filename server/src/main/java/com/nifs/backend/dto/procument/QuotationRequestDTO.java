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
public class QuotationRequestDTO extends BaseDTO {

    private String documentNo;
    private String epfNo;
    private String date;
    private String project;
    private String fund;
    private String srnNo;
    private String fileNo;
    private String validityPeriodOfTheQuotation;
    private String shippingTerms;
    private String supplierCatergory;
    private String bidStartingDate;
    private String bidClosingDate;
    private String remark;

}
