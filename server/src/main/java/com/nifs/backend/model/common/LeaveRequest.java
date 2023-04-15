package com.nifs.backend.model.common;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.model.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.format.annotation.DateTimeFormat;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@Entity
@Table(name = "leave-request")
public class LeaveRequest extends Base {

    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String leaveType;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "start_date")
    private String startDate;
    private String startTime;
    private String durationInDays;


    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "request_date_optional")
    private String requestDateOptional;
    private String jobCategory;
    private String evidence;

    RequestStatus hodApproved;
    RequestStatus dirApproved;

}
