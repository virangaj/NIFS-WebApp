package com.nifs.backend.repository.procument;

import com.nifs.backend.model.procument.QuotationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuotationRequestRepository extends JpaRepository<QuotationRequest,String> {


    @Query("select c from QuotationRequest c where c.documentNo = ?1")
    QuotationRequest findByDocumentNoEquals(String documentNo);
}
