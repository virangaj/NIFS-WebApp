package com.nifs.backend.dto.procument;

import com.nifs.backend.constant.RequestStatus;
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
public class GatePassDTO extends BaseDTO {

    private String documentNo;
    private String epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String locationAfterRemoval;
    private String purposeOfRemoval;
    private String dateOfRemoval;
    private String expectedReturnDate;
    private String remark;

    private String itemName;
    private String itemType;
    private String quantity;
    private String inventoryNumber;
    private String description;
    private String currentLocation;
    private String officerInChargeName;
    private String nameOfOfficerOutsideIncharge;
    private String resultOfVerificationBySecurityOfficer;

    RequestStatus hodApproved;
    RequestStatus dirApproved;



}
