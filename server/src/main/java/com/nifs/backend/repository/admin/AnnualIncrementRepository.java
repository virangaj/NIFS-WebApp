package com.nifs.backend.repository.admin;

import com.nifs.backend.model.admin.AnnualIncrement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnnualIncrementRepository extends JpaRepository<AnnualIncrement,String> {

    @Query("select c from AnnualIncrement c where c.documentNo = ?1")
    AnnualIncrement findByDocumentNoEquals(String documentNo);
}
