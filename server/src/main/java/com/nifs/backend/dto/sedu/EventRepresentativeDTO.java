package com.nifs.backend.dto.sedu;

import com.nifs.backend.constant.EventRepresentativeType;
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
public class EventRepresentativeDTO extends BaseDTO {
    String eventId;
    String name;
    String nic;
    String contactNo;
    String address;
    String email;
    EventRepresentativeType participantType;

}
