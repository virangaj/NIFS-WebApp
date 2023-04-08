package com.nifs.backend.model.procument;

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
@Table(name = "gate_pass")
public class GatePass extends Base {

    private String documentNo;
    private String epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String locationAfterRemoval;
    private String purposeOfRemoval;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date_of_removal")
    private String dateOfRemoval;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "expected_return_date")
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
}
