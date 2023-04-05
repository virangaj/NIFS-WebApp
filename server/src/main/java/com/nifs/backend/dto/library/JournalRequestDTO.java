package com.nifs.backend.dto.library;

import com.nifs.backend.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class JournalRequestDTO extends BaseDTO {

    private String documentNo;
    private String employee;
    private String designation;
    private String division;
    private String headOfLibrary;
    private String project;
    private String vote;
    private String budget;
    private String journalName;
    private String remarks;
    private String date;
    private String periodOfRequest;
    private String totalAmountDue;
    private String currencyType;
    private String ISSNNo;
    private String type;
    private String methodOfPayment;
    private String attachment;

}
