package com.nifs.backend.model.transport;

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

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "travel_cost")
public class TransportCost extends Base {

    private String documentNo;
    private String epfNo;
    private int hod;
    private String designationId;
    private String divisionId;
    private String project;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "tour_date")
    private String tourDate;

    private String sourceOfFunding;
    private String modeOfTravel;
    private String vehicleType;
    private String driverName;
    private String vehicleNo;
    private float estimatedKM;
    private float ratePerKM;
    private float totalCost;
    private float startReading;
    private float endReading;
    private String remark;

    RequestStatus hodApproved;
    RequestStatus dirApproved;
}
