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
    @Query("update EmployeeTypeMaster e set e.typeName = ?1, e.dateUpdated = ?2 where e.empTypeId = ?3")
    void updateEmployeeType(String typeName, Date dateUpdated, String typeId);
    @Query("""
            select e from EmployeeTypeMaster e
            where e.locationId.locationId = ?1
            order by e.empTypeId, e.typeName, e.locationId.locationId""")
    List<EmployeeTypeMaster> findEmpTypeByLocationId(
            String locationId);
    @Transactional
    @Modifying
    @Query("delete from EmployeeTypeMaster e where e.empTypeId = ?1")
    void deleteEmployeeType(String typeId);
    @Query("select e from EmployeeTypeMaster e where e.empTypeId = :typeId order by e.empTypeId")
    EmployeeTypeMaster returnType(@Param("typeId") String typeId);


//    @Query(value = "SELECT TOP 1 emp_type_id FROM employee_type_master ORDER BY emp_type_id DESC", nativeQuery = true)
    @Query(value = "SELECT emp_type_id FROM employee_type_master ORDER BY emp_type_id DESC LIMIT 1", nativeQuery = true)
    String returnLastId();




}
