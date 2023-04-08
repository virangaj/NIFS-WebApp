package com.nifs.backend.model.transport;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nifs.backend.model.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "travel_request")
public class TravelRequest extends Base {

    private String documentNo;
    private String epfNo;

    @Column(name = "designation_id")
    private String designationId;

    @Column(name = "division_id")
    private String divisionId;
    private int hod;

    @Column(name = "mode_of_Travel")
    private String modeOfTravel;

    private String locationAndRoute;
    private String otherPassengers;
    private String sourceOfFunding;
    private String vehicleType;
    private String purpose;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "request_date")
    private String requestDate;


    private String time;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "arrival_date")
    private String arrivalDate;
}
