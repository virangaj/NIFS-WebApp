package com.nifs.backend.dto.admin;

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
public class AnnualIncrementDTO extends BaseDTO {

    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String remark;
    private String date;
    private String noOfLeaves;
    private String salaryScale;
    private String presentSalary;
    private String newSalary;
}
