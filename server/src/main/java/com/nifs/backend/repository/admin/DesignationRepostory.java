package com.nifs.backend.repository.admin;

import com.nifs.backend.model.admin.DesignationMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface DesignationRepostory extends JpaRepository<DesignationMaster, String> {
    @Transactional
    @Modifying
    @Query("update DesignationMaster d set d.designationName = ?1, d.dateUpdated = ?2 where d.designationId = ?3")
    void updateDesignation(String designationName, Date dateUpdated, String id);
    @Query("select distinct d from DesignationMaster d where d.locationId.locationId = ?1 order by d.designationId, d.designationName")
    List<DesignationMaster> findDesignatonByLocationId(String locationId);
    @Transactional
    @Modifying
    @Query("delete from DesignationMaster d where d.designationId = :id")
    void deleteDesignation(@Param("id") String id);
    @Query("select d from DesignationMaster d where d.designationId = :id order by d.designationId")
    DesignationMaster returnDesignation(@Param("id") String id);

//    @Query(value = "SELECT TOP 1 designation_id FROM designation_master ORDER BY designation_id DESC", nativeQuery = true)
    @Query(value = "SELECT designation_id FROM designation_master ORDER BY designation_id DESC LIMIT 1", nativeQuery = true)
    String returnLastId();
}
