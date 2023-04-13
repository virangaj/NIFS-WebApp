package com.nifs.backend.dto.common;

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
public class OvertimeDTO extends BaseDTO {

    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String date;
    private String noOfHoursRequested;
    private String noOfHoursOTDone;
    private String nameOfWorkToBeDone;


    private String necessityToWorkOvertime;
    private String remark;


}
