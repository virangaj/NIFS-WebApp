package com.nifs.backend.repository.common;

import com.nifs.backend.model.common.ProjectMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProjectMasterRepository extends JpaRepository<ProjectMaster, Integer> {

    ProjectMaster findByProjectIdEquals(String projectId);

    @Query(value = "SELECT project_id FROM project_master ORDER BY project_id DESC LIMIT 1", nativeQuery = true)
//    @Query(value = "SELECT TOP 1 charge_id FROM venue_charges_master ORDER BY charge_id DESC", nativeQuery = true)
    String returnLastId();
}
