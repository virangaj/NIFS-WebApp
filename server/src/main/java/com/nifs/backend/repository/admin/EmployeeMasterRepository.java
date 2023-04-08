package com.nifs.backend.repository.admin;

import com.nifs.backend.model.admin.EmployeeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface EmployeeMasterRepository extends JpaRepository<EmployeeMaster, Integer> {

    @Transactional
    @Modifying
    @Query("update EmployeeMaster e set e.role = ?1 where e.epfNo = ?2")
    void updateRole(String status, int epfNo);
    @Query("select e from EmployeeMaster e where e.divisionId.divisionId = ?1 order by e")
    List<EmployeeMaster> findByDivisionId(String divisionId);


    @Transactional
    @Modifying
    @Query("update EmployeeMaster e set e.isDelete = ?1 where e.epfNo = ?2")
    void updateIsDelete(Boolean isDelete, int epfNo);
    @Transactional
    @Modifying
    @Query("delete from EmployeeMaster e where e.epfNo = ?1")
    void deleteEmployee(int epfNo);

    @Query(value = "SELECT * FROM employee_master WHERE epf_no =?1", nativeQuery = true)
    EmployeeMaster returnEmployeeById(int epf_no);


}
