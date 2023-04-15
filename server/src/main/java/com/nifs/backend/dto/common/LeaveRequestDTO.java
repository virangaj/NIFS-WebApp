package com.nifs.backend.dto.common;

import com.nifs.backend.constant.RequestStatus;
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
public class LeaveRequestDTO extends BaseDTO {

    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String leaveType;
    private String startDate;
    private String startTime;
    private String durationInDays;


    private String requestDateOptional;
    private String jobCategory;
    private String evidence;

    RequestStatus hodApproved;
    RequestStatus dirApproved;

}
