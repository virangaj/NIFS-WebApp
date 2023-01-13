package com.nifs.backend.service;

import com.nifs.backend.dto.EmpCatDTO;
import com.nifs.backend.model.EmployeeCategory;

import java.util.List;
import java.util.Optional;

public interface EmployeeCatServiceInterface {
    //return all category
    List<EmpCatDTO> getAll();

    //create new category
    Boolean createNewCategory(EmpCatDTO e);
    //    return new employee category id
    String returnNewEmpCatId();
    //    return empCat by id
    Optional<EmployeeCategory> returnEmpCat(String empCatId);

    //update employee category
    Boolean updateEmployeeCategory(EmpCatDTO empCatData, String empCatId);


    //delete employee category
    Boolean deleteEmployeeCategory(String empCatId);


    //get category by location id
    List<EmpCatDTO> getCategoryByLocationId(String locId);
}
