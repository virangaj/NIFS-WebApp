package com.nifs.backend.service.sedu;

import com.nifs.backend.dto.sedu.ParticipantsMasterDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IParticipantMasterService {
    boolean addSingleParticipants(ParticipantsMasterDTO data, String user);

    List<ParticipantsMasterDTO> getParticipantsByEventId(String id);
}
