package com.nifs.backend.dto.admin;

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
public class InsuranceClaimDTO extends BaseDTO {

    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String date;
    private String remark;

    private String claimPaidDate;
    private String spectacleClaimDate;
    private float noOfClaims;
    private float claimAmount;
    private float totalBillAmount;
    private float paidClaimAmount;
    private float notPaidClaimAmount;

    RequestStatus hodApproved;
    RequestStatus dirApproved;


}
