package com.nifs.backend.dto.library;

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
public class JournalRequestDTO extends BaseDTO {

    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String project;
    private String vote;
    private String journalName;

    private String date;
    private String periodOfRequest;
    private String totalAmountDue;
    private String currencyType;
    private String ISSN_No;
    private String type;
    private String methodOfPayment;
    private String remark;




}
