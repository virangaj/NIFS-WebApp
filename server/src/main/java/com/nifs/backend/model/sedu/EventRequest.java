package com.nifs.backend.model.sedu;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nifs.backend.dto.BaseDTO;
import com.nifs.backend.model.Base;
import com.nifs.backend.model.admin.Locations;
import com.nifs.backend.model.common.FundingSources;
import com.nifs.backend.model.common.ProjectMaster;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@Table(name="event_request_master")
public class EventRequest extends Base {

    private String documentNo;
    private String startDate;
    private String startTime;
    private String EndDate;
    private String EndTime;
    private String title;
    private String remark;
    private String eventType;
    private int noParticipants;
    private int budget;

    //locations
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    private Locations locationId;

    private String projectId;

    private String fundingId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "venue_id", referencedColumnName = "venue_id", nullable = false)
    private VenueMaster venueId;


}
