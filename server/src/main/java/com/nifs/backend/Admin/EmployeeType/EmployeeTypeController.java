package com.nifs.backend.Admin.EmployeeType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("admin/employeetype")
public class EmployeeTypeController {

    @Autowired
    private EmployeeTypeService empTypeService;


//    get all employee types
    @GetMapping
    private List<EmployeeTypeMaster> getAllTypes(){
        return empTypeService.getAllTypes();
    }

//    create new employee type
    @PostMapping
    private Boolean createEmpType(@RequestBody EmployeeTypeMaster empTypeData){
        return empTypeService.createEmpType(empTypeData);
    }

}

