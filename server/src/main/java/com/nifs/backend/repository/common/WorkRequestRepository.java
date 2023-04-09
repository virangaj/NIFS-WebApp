package com.nifs.backend.repository.common;

import com.nifs.backend.model.common.WorkRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface WorkRequestRepository extends JpaRepository<WorkRequest,String> {

    @Query("select c from WorkRequest c where c.documentNo = ?1")
    WorkRequest findByDocumentNoEquals(String documentNo);
}
