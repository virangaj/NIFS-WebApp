package com.nifs.backend.service;

import com.nifs.backend.dto.EmployeeTypeDTO;

import java.util.List;

public interface EmployeeTypeServiceInterface {

    //    get all employee types
    List<EmployeeTypeDTO> getAllTypes();

    //get new id
    String returnNewId();

//    get emp type by location id
    List<EmployeeTypeDTO> GetEmpTypeByLocationId(String locId);

    //    create new employee type
    Boolean createEmpType(EmployeeTypeDTO empTypeData);

    //    update employee Type
    Boolean updateEmployeeType(EmployeeTypeDTO empTypeData, String typeId);

    //    delete employee type
    Boolean deleteEmployeeType(String id);
}
