package com.nifs.backend.admin.EmployeeMaster;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface EmployeeMasterRepository extends JpaRepository<EmployeeMaster, Integer> {
    @Transactional
    @Modifying
    @Query("delete from EmployeeMaster e where e.epfNo = ?1")
    void deleteEmployee(int epfNo);

    @Query(value = "SELECT * FROM employee_master WHERE epf_no =?1", nativeQuery = true)
    EmployeeMaster returnEmployeeById(int epf_no);

}
