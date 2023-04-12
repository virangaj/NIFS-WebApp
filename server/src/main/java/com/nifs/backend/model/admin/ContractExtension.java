package com.nifs.backend.model.admin;


import com.nifs.backend.model.Base;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name="contract_extension")
public class ContractExtension extends Base {

    int epfNo;
    String documentNo;
    String date;
    String designationId;
    String divisionId;
    String hod;
    String remark;


}
