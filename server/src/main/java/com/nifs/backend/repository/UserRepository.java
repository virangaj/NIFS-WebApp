package com.nifs.backend.repository;

import com.nifs.backend.constant.UserRole;
import com.nifs.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Transactional
    @Modifying
    @Query("update User u set u.isDelete = ?1 where u.employee.epfNo = ?2")
    void updateIsDelete(Boolean isDelete, int employee);
    @Transactional
    @Modifying
    @Query("update User u set u.role = ?1 where u.employee.epfNo = ?2")
    void updateUserRole(UserRole role, int employee);
    //change password
    @Transactional
    @Modifying
    @Query("update User e set e.password = ?1, e.lastLogin = ?2 where e.employee.epfNo = ?3")
    void changePassword(String password, Date d, int epfNo);


    //check by epfNo and password
    @Query("select e from User e where e.employee.epfNo = ?1 and e.password = ?2")
    User checkIdAndPassword(int id, String password);

    //return login details by epfNo
    @Query("select e from User e where e.employee.epfNo = ?1")
    User returnLoginDetails(int epfNo);





}
