package com.nifs.backend.Admin.EmployeeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeTypeRepository extends JpaRepository<EmployeeTypeMaster, String> {
    @Query("select e from EmployeeTypeMaster e where e.typeId = :typeId order by e.typeId")
    EmployeeTypeMaster returnType(@Param("typeId") String typeId);




}
