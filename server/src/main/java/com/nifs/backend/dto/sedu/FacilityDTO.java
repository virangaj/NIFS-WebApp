package com.nifs.backend.dto.sedu;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class FacilityDTO {
    private String facilityId;
    private String name;
    private Date createdOn;
    private Date modifiedOn;
    private Integer createdBy;
    private Integer modifiedBy;
}
