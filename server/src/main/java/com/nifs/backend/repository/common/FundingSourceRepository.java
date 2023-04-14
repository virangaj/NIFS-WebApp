package com.nifs.backend.repository.common;

import com.nifs.backend.model.common.FundingSources;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface FundingSourceRepository extends JpaRepository<FundingSources, Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE FundingSources f SET f.name = :name, f.description = :description, f.modifiedBy = :modifiedBy, f.modifiedOn = :modifiedOn WHERE f.fundingId = :fundingId")
    void updateFundingSource(@Param("name") String name, @Param("description") String description, @Param("modifiedBy") String modifiedBy, @Param("modifiedOn") Date modifiedOn, @Param("fundingId") String fundingId);

    @Query(value = "SELECT project_id FROM project_master ORDER BY project_id DESC LIMIT 1", nativeQuery = true)
//    @Query(value = "SELECT TOP 1 charge_id FROM venue_charges_master ORDER BY charge_id DESC", nativeQuery = true)
    String returnLastId();
}
