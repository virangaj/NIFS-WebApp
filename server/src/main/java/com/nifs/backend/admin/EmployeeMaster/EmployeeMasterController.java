package com.nifs.backend.admin.EmployeeMaster;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/employee")
@CrossOrigin
public class EmployeeMasterController {

    @Autowired
    private EmployeeMasterService empService;

    //get all employees
    @GetMapping
    private List<EmployeeMasterDTO> getAllEmployees() throws HttpMessageNotWritableException {
       try{
           return empService.getAllEmployees();
       }
       catch(HttpMessageNotWritableException e){
           return null;
       }
    }

    @GetMapping("/withoutdelete")
    private List<EmployeeMasterDTO> getAllEmployeesWithoutDeleted() throws HttpMessageNotWritableException {
        try{
            return empService.getAllEmployeesWithoutDeleted();
        }
        catch(HttpMessageNotWritableException e){
            return null;
        }
    }

    @GetMapping("/deleted")
    private List<EmployeeMasterDTO> getAllEmployeeDataCurrentlyNotWorking() throws HttpMessageNotWritableException {
        try{
            return empService.getAllEmployeeDataCurrentlyNotWorking();
        }
        catch(HttpMessageNotWritableException e){
            return null;
        }
    }

    @PostMapping
    private Boolean addEmployee(@RequestBody EmployeeMasterDTO empData){
        return empService.addEmployee(empData);
    }

    @PatchMapping("/delete/{id}")
    private Boolean deleteEmployee(@PathVariable int id){
        return empService.deleteEmployee(id);
    }

    @DeleteMapping("/harddelete/{id}")
    private Boolean hardDeleteEmployee(@PathVariable int id){
        return empService.hardDeleteEmployee(id);
    }
}
