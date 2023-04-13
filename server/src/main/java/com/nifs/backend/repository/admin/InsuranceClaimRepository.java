package com.nifs.backend.repository.admin;

import com.nifs.backend.model.admin.InsuranceClaim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InsuranceClaimRepository extends JpaRepository<InsuranceClaim,String> {

    @Query("select c from InsuranceClaim c where c.documentNo = ?1")
    InsuranceClaim findByDocumentNoEquals(String documentNo);

}
