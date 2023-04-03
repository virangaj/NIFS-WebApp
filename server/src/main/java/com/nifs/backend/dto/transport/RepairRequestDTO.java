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
public class RepairRequestDTO extends BaseDTO {

    private String documentNo;
    private String date;
    private String employeeNo;
    private String vehicleNo;
    private String designation;
    private String attachment;
    private String division;
    private String remarks;




}
