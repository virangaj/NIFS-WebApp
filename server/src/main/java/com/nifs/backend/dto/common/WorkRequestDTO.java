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
public class WorkRequestDTO extends BaseDTO {

    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String date;
    private String project;
    private String workType;
    private String program;


    private String hodEmail;
    private String supervisorEmail;
    private String workDescription;
    private String googleLinkWithWorkDescription;

    RequestStatus hodApproved;
    RequestStatus dirApproved;

}
