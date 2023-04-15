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
public class AccomodationDTO extends BaseDTO {

    private String documentNo;
    private String epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String date;
    private String guestName;
    private String address;
    private String email;
    private String nicNo;
    private String telephoneNo;
    private String roomNumber;
    private String noOfDays;
    private String fromDate;

    private String toDate;
    private String roomRates;
    private String roomType;
    private String totalCharges;

    RequestStatus hodApproved;
    RequestStatus dirApproved;

}
