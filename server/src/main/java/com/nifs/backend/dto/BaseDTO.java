package com.nifs.backend.dto;


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
public class BaseDTO {
    private int id;
    private Date createdOn;
    private Date modifiedOn;
    private boolean isDeleted;
    private Integer createdBy;
    private Integer modifiedBy;
}
