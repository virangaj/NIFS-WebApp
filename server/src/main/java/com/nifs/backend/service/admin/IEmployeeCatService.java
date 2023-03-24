package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.EmpCatDTO;
import com.nifs.backend.model.admin.EmployeeCategory;

import java.util.List;

public interface IEmployeeCatService {
    //return all category
    List<EmpCatDTO> getAllEmpCategories();

    //create new category
    boolean createNewCategory(EmpCatDTO e);
    //    return new employee category id
    String returnNewEmpCatId();
    //    return empCat by id
    EmployeeCategory returnEmpCat(String empCatId);

    //update employee category
    Boolean updateEmployeeCategory(EmpCatDTO empCatData, String empCatId);


    //delete employee category
    Boolean deleteEmployeeCategory(String empCatId);


    //get category by location id
    List<EmpCatDTO> getCategoryByLocationId(String locId);
}
