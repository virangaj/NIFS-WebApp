package com.nifs.backend.controller;

import com.nifs.backend.dto.EmployeeMasterDTO;
import com.nifs.backend.service.IEmployeeMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/employee")
@CrossOrigin
public class EmployeeMasterController {

    @Autowired
    private IEmployeeMasterService empService;

    //get all currently working employees
    @GetMapping
    private List<EmployeeMasterDTO> getAllEmployees() {
       try{
           return empService.getAllEmployees();
       }
       catch(Exception e){
           return null;
       }
    }

    //return all employees worked so far
    @GetMapping("/withoutdelete")
    private List<EmployeeMasterDTO> getAllEmployeesWithoutDeleted() {
        try{
            return empService.getAllEmployeesWithoutDeleted();
        }
        catch(Exception e){
            return null;
        }
    }

    // return all deleted employees
    @GetMapping("/deleted")
    private List<EmployeeMasterDTO> getAllEmployeeDataCurrentlyNotWorking()  {
        try{
            return empService.getAllEmployeeDataCurrentlyNotWorking();
        }
        catch(Exception e){
            return null;
        }
    }


    //get employee by employee id
    @GetMapping("/{id}")
    private EmployeeMasterDTO getEmployeeById(@PathVariable int id){
        return empService.getEmployeeById(id);
    }


    //add new employee
    @PostMapping
    private Boolean addEmployee(@RequestBody EmployeeMasterDTO empData){
        return empService.addEmployee(empData);
    }

    //change is empty value -> true
    @PatchMapping("/delete/{id}")
    private Boolean deleteEmployee(@PathVariable int id){
        return empService.deleteEmployee(id);
    }

    // remove employee from database
    @DeleteMapping("/harddelete/{id}")
    private Boolean hardDeleteEmployee(@PathVariable int id){
        return empService.hardDeleteEmployee(id);
    }
}
