package com.nifs.backend.repository.library;

import com.nifs.backend.model.library.JournalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface JournalRequestRepository extends JpaRepository<JournalRequest,String> {


    @Query("select c from JournalRequest c where c.documentNo = ?1")
    JournalRequest findByDocumentNoEquals(String documentNo);
}
