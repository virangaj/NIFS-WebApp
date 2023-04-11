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
public class ContractExtensionDTO extends BaseDTO {


    int epfNo;
    String documentNo;
    String date;
    String designationId;
    String divisionId;
    String hod;
    String remark;



}
