package com.nifs.backend.dto.sedu;

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
public class EventResponseDTO {
    EventRequestMasterDTO eventData;
    List<EventRepresentativeDTO> representativeList;
    List<ParticipantsMasterDTO> participantsList;
}
