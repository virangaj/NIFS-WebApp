package com.nifs.backend.model.common;

import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(name = "payment_request")
public class PaymentRequest extends Base {

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
    private String description;
    private String remark;

    private int grossAmount;
    private int friegthCharge;
    private int clearingCharge;
    private int directorGeneralCharge;
    private int customCharge;
    private int courierCharge;
    private int airLineCharge;
    private int handlingCharge;
    private int insurance;
    private int otherCharge;
}
