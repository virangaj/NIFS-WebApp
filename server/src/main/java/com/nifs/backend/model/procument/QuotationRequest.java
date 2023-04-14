package com.nifs.backend.model.procument;

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
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "quotation_request")
public class QuotationRequest extends Base {

    private String documentNo;
    private String epfNo;
    private String designationId;
    private String divisionId;
    private float hod;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;
    private String project;
    private String fund;
    private String srnNo;
    private String fileNo;
    private String validityPeriodOfTheQuotation;
    private String shippingTerms;
    private String supplierCatergory;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "bid_starting_date")
    private String bidStartingDate;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "bid_closing_date")
    private String bidClosingDate;
    private String remark;

    RequestStatus hodApproved;
    RequestStatus dirApproved;
}
