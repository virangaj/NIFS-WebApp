package com.nifs.backend.repository.common;

import com.nifs.backend.model.common.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest,String> {

    @Query("select c from LeaveRequest c where c.documentNo = ?1")
    LeaveRequest findByDocumentNoEquals(String documentNo);

}
