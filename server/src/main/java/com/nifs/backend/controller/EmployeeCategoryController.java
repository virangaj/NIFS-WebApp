package com.nifs.backend.controller;


import com.nifs.backend.service.EmployeeCategoryService;
import com.nifs.backend.dto.EmpCatDTO;
import com.nifs.backend.model.EmployeeCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin/employeecategory")
@CrossOrigin
public class EmployeeCategoryController {


    @Autowired
    private EmployeeCategoryService empCatService;

//    get all employee categories
    @GetMapping
    List<EmpCatDTO> getAll(){
        return empCatService.getAll();
    }


//    return new employee category id
    @GetMapping("/newid")
    String returnNewEmpCatId(){
        return empCatService.returnNewEmpCatId();
    }
//    get employee cat by id
    @GetMapping("/{empCatData}")
    Optional<EmployeeCategory> returnEmpCat(@PathVariable String empCatData){
        return empCatService.returnEmpCat(empCatData);
    }

    //get emp category by location id
    @GetMapping("/location/{locId}")
    private List<EmpCatDTO> getCategoryByLocationId(@PathVariable String locId){
        return empCatService.getCategoryByLocationId(locId);
    }


    //    create new employee category
    @PostMapping
    Boolean createNewEmployeeCategory(@RequestBody EmpCatDTO empCatData){
        return empCatService.createNewCategory(empCatData);
    }

//    update employee category
    @PatchMapping("/update/{empCatId}")
    Boolean updateEmployeeCategory(@RequestBody EmpCatDTO empCatData, @PathVariable String empCatId){
        return empCatService.updateEmployeeCategory(empCatData, empCatId);
    }

//    delete employee category
    @DeleteMapping("/delete/{empCatId}")
    Boolean deleteEmployeeCategory(@PathVariable String empCatId){
        return empCatService.deleteEmployeeCategory(empCatId);
    }
}
