package com.nifs.backend.dto.sedu;


import com.nifs.backend.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class EventRequestMasterDTO extends BaseDTO {

    private String documentNo;
    private String startDate;
    private String startTime;
    private String EndDate;
    private String EndTime;
    private String title;
    private String remark;
    private String locationId;
    private String venueId;
    private String fundingId;
    private String projectId;
    private String eventType;
    private int noParticipants;
    private int budget;
   


}
