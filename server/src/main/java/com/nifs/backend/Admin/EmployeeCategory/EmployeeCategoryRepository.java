package com.nifs.backend.Admin.EmployeeCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeCategoryRepository extends JpaRepository<EmployeeCategory, String> {

    @Query(value= "SELECT * FROM employee_category WHERE employee_category_code =?1",nativeQuery = true)
    EmployeeCategory returnEmployeeCategory(String id);

    @Query(value = "SELECT TOP 1 employee_category_code FROM employee_category ORDER BY employee_category_code DESC", nativeQuery = true)
    String returnLastId();

}
