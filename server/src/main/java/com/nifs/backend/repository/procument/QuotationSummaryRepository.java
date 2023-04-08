package com.nifs.backend.repository.procument;

import com.nifs.backend.model.procument.QuotationSummary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuotationSummaryRepository extends JpaRepository<QuotationSummary,String> {


    @Query("select c from QuotationSummary c where c.documentNo = ?1")
    QuotationSummary findByDocumentNoEquals(String documentNo);

}
