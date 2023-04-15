package com.nifs.backend.model.admin;

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
@Setter
@Getter
@SuperBuilder
@Entity
@Table(name = "insurance_claim")
public class InsuranceClaim extends Base {

    private String documentNo;
    private int epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;
    private String remark;


    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "claim_paid_date")
    private String claimPaidDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "spectacle_claim_date")
    private String spectacleClaimDate;
    private float noOfClaims;
    private float claimAmount;
    private float totalBillAmount;
    private float paidClaimAmount;
    private float notPaidClaimAmount;

    RequestStatus hodApproved;
    RequestStatus dirApproved;
}
