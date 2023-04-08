package com.nifs.backend.dto.procument;

import com.nifs.backend.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
public class SrnDTO extends BaseDTO {


    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;
    private String date;
    private String project;
    private String srnType;
    private String itemType;
    private String purchaseType;
    private String estimatedValue;
    private String vote;
    private String fundAllocationForTheProject;
    private String description;
    private String googleLink;
}
