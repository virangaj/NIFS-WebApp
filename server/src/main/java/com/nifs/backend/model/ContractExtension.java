package com.nifs.backend.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="contract_extension")
public class ContractExtension extends Base{

    String name;


}
