package com.nifs.backend.dto.sedu;

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
public class ParticipantsMasterDTO extends BaseDTO {
    private String participantId;
    private String eventId;
    private String name;
    private String nic;
    private String gender;
    private String contactNo;
    private String address;
    private String email;
    private String institute;

}
