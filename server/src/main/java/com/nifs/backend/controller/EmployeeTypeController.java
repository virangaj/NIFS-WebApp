package com.nifs.backend.controller;

import com.nifs.backend.dto.EmployeeTypeDTO;
import com.nifs.backend.service.EmployeeTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("admin/employeetype")
@CrossOrigin
public class EmployeeTypeController {

    @Autowired
    private EmployeeTypeService empTypeService;


//    get all employee types
    @GetMapping
    private List<EmployeeTypeDTO> getAllTypes(){
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
    private Boolean createEmpType(@RequestBody EmployeeTypeDTO empTypeData){
        return empTypeService.createEmpType(empTypeData);
    }


//    update employee Type

    @PatchMapping("/update/{type_id}")
    private Boolean updateEmployeeType(@PathVariable String type_id, @RequestBody EmployeeTypeDTO empTypeData){
        return empTypeService.updateEmployeeType(empTypeData, type_id);
    }


//    delete employee type
    @DeleteMapping("/delete/{id}")
    private Boolean deleteEmployeeType(@PathVariable String id){
        return empTypeService.deleteEmployeeType(id);
    }
}

