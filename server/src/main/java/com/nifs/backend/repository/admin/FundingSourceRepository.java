package com.nifs.backend.repository.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.model.admin.FundingSources;
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
}
