package com.nifs.backend.model.sedu;

import com.nifs.backend.constant.EventRepresentativeType;
import com.nifs.backend.model.Base;
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
@Table(name="event_representative_master")
public class EventRepresentativeMaster extends Base {

    private String participantId;
    private String eventId;
    private String name;
    private String nic;
    private String contactNo;
    private String address;
    private String email;
    private EventRepresentativeType participantType;


}
