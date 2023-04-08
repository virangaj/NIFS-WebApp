package com.nifs.backend.repository.transport;

import com.nifs.backend.model.transport.ReplacementRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ReplacementRequestRepository extends JpaRepository<ReplacementRequest,String> {


    @Query("select c from ReplacementRequest c where c.documentNo = ?1")
    ReplacementRequest findByDocumentNoEquals(String documentNo);
}
