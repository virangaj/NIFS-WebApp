package com.nifs.backend.Admin.EmployeeDesignation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface DesignationRepostory extends JpaRepository<DesignationMaster, String> {
    @Transactional
    @Modifying
    @Query("delete from DesignationMaster d where d.id = :id")
    void deleteDesignation(@Param("id") String id);
    @Query("select d from DesignationMaster d where d.id = :id order by d.id")
    DesignationMaster returnDesignation(@Param("id") String id);

    @Query(value = "SELECT TOP 1 id FROM designation_master ORDER BY id DESC", nativeQuery = true)
    String returnLastId();
}
