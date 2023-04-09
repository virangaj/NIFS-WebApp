package com.nifs.backend.dto.sedu;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class VenueMasterDTO {
    private String venueId;
    private String venueName;
    private String type;
    private int capacity;
    private String remark;
    private String location;
    private String availability;
    private Date createdOn;
    private Date modifiedOn;
    private boolean isDeleted;
    private Integer createdBy;
    private Integer modifiedBy;

    private List<String> facilities;
    private List<String> charges;

}
