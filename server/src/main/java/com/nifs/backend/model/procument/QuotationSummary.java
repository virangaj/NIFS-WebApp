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
@Table(name = "quotation_summary")
public class QuotationSummary extends Base {

    private String documentNo;
    private String epfNo;
    private String designationId;
    private String divisionId;
    private int hod;

    private String fundType;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;
    private String quotationRequestNo;
    private String fileNo;
    private String srnNo;
    private String value;
    private String fund;
    private String project;
    private String remark;

    RequestStatus hodApproved;
    RequestStatus dirApproved;
}
