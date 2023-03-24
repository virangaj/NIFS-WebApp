package com.nifs.backend.repository.admin;

import com.nifs.backend.model.admin.EmployeeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface EmployeeCategoryRepository extends JpaRepository<EmployeeCategory, String> {
    @Query("""
            select e from EmployeeCategory e
            where e.locationId.locationId = ?1
            order by e.empCatId, e.description, e.otRate, e.locationId.locationId""")
    List<EmployeeCategory> findCategoryByLocationId(
            String locationId);
    @Transactional
    @Modifying
    @Query("delete from EmployeeCategory e where e.empCatId like :empCatId")
    void deleteEmployeeCategory(String empCatId);
    @Transactional
    @Modifying
    @Query("""
            UPDATE EmployeeCategory e set e.description = :description, e.otRate = :otRate, e.dateUpdated =:dateUpdated
            WHERE e.empCatId LIKE :employeeCategoryId""")
    void UpdateEmployeeCategory(@Param("description") String description, @Param("otRate") float otRate, @Param("dateUpdated") Date dateUpdated,
                                @Param("employeeCategoryId") String employeeCategoryId);

    @Query(value= "SELECT * FROM employee_category_master WHERE employee_category_code =?1",nativeQuery = true)
    EmployeeCategory returnEmployeeCategory(String id);

//    @Query(value = "SELECT TOP 1 employee_category_code FROM employee_category_master ORDER BY employee_category_code DESC", nativeQuery = true)
    @Query(value = "SELECT employee_category_code FROM employee_category_master ORDER BY employee_category_code DESC LIMIT 1", nativeQuery = true)
    String returnLastId();

}
