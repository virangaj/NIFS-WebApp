package com.nifs.backend.repository;

import com.nifs.backend.model.EmployeeLogin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeLoginRepository extends JpaRepository<EmployeeLogin, Integer> {
    @Query("select e from EmployeeLogin e where e.employee.id = ?1")
    EmployeeLogin findByEpfNo(int id);




}
