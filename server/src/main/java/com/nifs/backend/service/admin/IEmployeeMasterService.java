package com.nifs.backend.service.admin;

import com.nifs.backend.constant.UserRole;
import com.nifs.backend.dto.admin.EmployeeMasterDTO;

import java.util.List;

public interface IEmployeeMasterService {

    //get all employees
    List<EmployeeMasterDTO> getAllEmployees();

    //get all employees without delete
    List<EmployeeMasterDTO> getAllEmployeesWithoutDeleted();

    //get All Employee Data Currently Not Working
    List<EmployeeMasterDTO> getAllEmployeeDataCurrentlyNotWorking();
    //add employee
    Boolean addEmployee(EmployeeMasterDTO e);

    //delete employee -> update isDelete
    Boolean updateIsDelete(int id);

    //remove employee from database
    Boolean hardDeleteEmployee(int id);

    //get division by employee id
    EmployeeMasterDTO getEmployeeById(int id);

    boolean updateRole(int id, UserRole role);

    String getDirectorEmail();

    String getSecretaryEmail();
}
