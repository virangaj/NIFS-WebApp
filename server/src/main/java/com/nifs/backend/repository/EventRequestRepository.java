package com.nifs.backend.repository;

import com.nifs.backend.model.EventRequestMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRequestRepository extends JpaRepository<EventRequestMaster, String> {


}
