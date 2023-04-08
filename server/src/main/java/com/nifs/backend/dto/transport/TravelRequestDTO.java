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
public class TravelRequestDTO extends BaseDTO {

    private String documentNo;
    private String epfNo;
    private String designationId;
    private String divisionId;
    private int hod;
    private String modeOfTravel;
    private String locationAndRoute;
    private String otherPassengers;
    private String sourceOfFunding;
    private String vehicleType;
    private String purpose;
    private String requestDate;
    private String time;
    private String arrivalDate;
}
