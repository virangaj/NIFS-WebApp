package com.nifs.backend.repository.sedu;


import com.nifs.backend.model.sedu.ParticipantMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantMasterRepository extends JpaRepository<ParticipantMaster, Integer> {
    List<ParticipantMaster> findByEventIdEquals(String eventId);
}
