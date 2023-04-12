package com.nifs.backend.dto.admin;

import com.nifs.backend.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class FundingSourceDTO extends BaseDTO {
    private String fundingId;
    private String name;
    private String description;
    private String locationId;
}
