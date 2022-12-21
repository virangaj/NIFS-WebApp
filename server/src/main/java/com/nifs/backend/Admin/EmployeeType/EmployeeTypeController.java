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

    //get new id
    @GetMapping("/newid")
    private String returnNewId(){
        return empTypeService.returnNewId();
    }

//    get emp type by location id
    @GetMapping("/location/{locId}")
    private List<EmployeeTypeDTO> GetEmpTypeByLocationId(@PathVariable String locId){
        return empTypeService.GetEmpTypeByLocationId(locId);
    }

//    create new employee type
    @PostMapping
    private Boolean createEmpType(@RequestBody EmployeeTypeMaster empTypeData){
        return empTypeService.createEmpType(empTypeData);
    }


//    update employee Type

    @PutMapping("update/{type_id}")
    private Boolean updateEmployeeType(@PathVariable String type_id, @RequestBody EmployeeTypeMaster empTypeData){
        return empTypeService.updateEmployeeType(empTypeData);
    }


//    delete employee type
    @DeleteMapping("delete/{id}")
    private Boolean deleteEmployeeType(@PathVariable String id){
        return empTypeService.deleteEmployeeType(id);
    }
}

