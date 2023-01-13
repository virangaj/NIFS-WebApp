package com.nifs.backend.repository;

import com.nifs.backend.model.EmployeeTypeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface EmployeeTypeRepository extends JpaRepository<EmployeeTypeMaster, String> {
    @Transactional
    @Modifying
    @Query("update EmployeeTypeMaster e set e.typeName = ?1, e.dateUpdated = ?2 where e.typeId = ?3")
    void updateEmployeeType(String typeName, Date dateUpdated, String typeId);
    @Query("""
            select e from EmployeeTypeMaster e
            where e.location.locationId = ?1
            order by e.typeId, e.typeName, e.location.locationId""")
    List<EmployeeTypeMaster> findEmpTypeByLocationId(
            String locationId);
    @Transactional
    @Modifying
    @Query("delete from EmployeeTypeMaster e where e.typeId = ?1")
    void deleteEmployeeType(String typeId);
    @Query("select e from EmployeeTypeMaster e where e.typeId = :typeId order by e.typeId")
    EmployeeTypeMaster returnType(@Param("typeId") String typeId);

    @Query(value = "SELECT TOP 1 type_id FROM employee_type_master ORDER BY type_id DESC", nativeQuery = true)
    String returnLastId();



}
