package com.nifs.backend.repository;

import com.nifs.backend.model.EmployeeLogin;
import com.nifs.backend.model.EmployeeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface EmployeeLoginRepository extends JpaRepository<EmployeeLogin, Integer> {
    //change password
    @Transactional
    @Modifying
    @Query("update EmployeeLogin e set e.password = ?1, e.lastLogin = ?2 where e.employee.epfNo = ?3")
    void changePassword(String password, Date d, int epfNo);


    //check by epfNo and password
    @Query("select e from EmployeeLogin e where e.employee.epfNo = ?1 and e.password = ?2")
    EmployeeLogin checkIdAndPassword(int id, String password);

    //return login details by epfNo
    @Query("select e from EmployeeLogin e where e.employee.epfNo = ?1")
    EmployeeLogin returnLoginDetails(int epfNo);





}
