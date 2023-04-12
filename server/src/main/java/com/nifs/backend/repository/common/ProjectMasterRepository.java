package com.nifs.backend.repository.common;

import com.nifs.backend.model.common.ProjectMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public interface ProjectMasterRepository extends JpaRepository<ProjectMaster, Integer> {

    ProjectMaster findByProjectIdEquals(String projectId);


    @Transactional
    @Modifying
    @Query("update ProjectMaster p set p.projectName = :projectName, p.description = :description, p.modifiedOn = :modifiedOn, p.modifiedBy = :modifiedBy where p.projectId = :projectId")
    void updateProject(@Param("projectName") String projectName, @Param("description") String description, @Param("modifiedOn") Date modifiedOn, @Param("modifiedBy") Integer modifiedBy, @Param("projectId") String projectId);

    @Query(value = "SELECT funding_id FROM funding_sources ORDER BY funding_id DESC LIMIT 1", nativeQuery = true)
//    @Query(value = "SELECT TOP 1 charge_id FROM venue_charges_master ORDER BY charge_id DESC", nativeQuery = true)
    String returnLastId();
}
