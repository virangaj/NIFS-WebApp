package com.nifs.backend.Admin.EmployeeMaster;

import com.nifs.backend.Admin.EmployeeType.EmployeeTypeMaster;
import org.apache.el.parser.BooleanNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/employee")
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


    @PostMapping
    private Boolean addEmployee(@RequestBody EmployeeMaster empData){
        return empService.addEmployee(empData);
    }

    @DeleteMapping("/delete/{id}")
    private Boolean deleteEmployee(@PathVariable int id){
        return empService.deleteEmployee(id);
    }
}
