package com.nifs.backend.model.library;

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
@Table(name = "journal_request")
public class JournalRequest extends Base {

    private String documentNo;

    private String employee;
    private String designation;
    private String division;

    @Column(name = "head_of_library")
    private String headOfLibrary;

    private String project;
    private String vote;
    private String budget;
    private String journalName;
    private String remarks;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;

    @Column(name = "period_of_request")
    private String periodOfRequest;

    @Column(name = "total_amount_due")
    private String totalAmountDue;

    @Column(name = "currency_type")
    private String currencyType;

    @Column(name = "ISSN_No")
    private String ISSNNo;

    private String type;

    @Column(name = "method_of_payment")
    private String methodOfPayment;

    private String attachment;

}
