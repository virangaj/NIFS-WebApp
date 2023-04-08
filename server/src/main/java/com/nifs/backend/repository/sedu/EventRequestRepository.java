package com.nifs.backend.repository.sedu;

import com.nifs.backend.model.admin.EventRequestMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRequestRepository extends JpaRepository<EventRequestMaster, String> {


}
