package com.nifs.backend.model.admin;


import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.model.Base;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name="resignation_request")
public class ResignationRequest extends Base {
    int epfNo;
    String documentNo;
    String date;
    String designationId;
    String divisionId;
    String hod;
    String remark;
    RequestStatus hodApproved;
    RequestStatus dirApproved;
}
