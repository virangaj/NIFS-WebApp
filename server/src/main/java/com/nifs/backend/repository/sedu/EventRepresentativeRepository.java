package com.nifs.backend.repository.sedu;

import com.nifs.backend.model.sedu.EventRepresentativeMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepresentativeRepository extends JpaRepository<EventRepresentativeMaster, Integer> {
    List<EventRepresentativeMaster> findByEventIdEquals(String eventId);
}
