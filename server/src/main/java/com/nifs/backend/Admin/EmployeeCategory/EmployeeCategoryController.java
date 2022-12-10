package com.nifs.backend.Admin.EmployeeCategory;


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
    List<EmployeeCategory> getAll(){
        return empCatService.getAll();
    }


//    return new employee category id
    @GetMapping("/newid")
    String returnNewEmpCatId(){
        return empCatService.returnNewEmpCatId();
    }
//    get employee cat by id
    @GetMapping("/{empcatId}")
    Optional<EmployeeCategory> returnEmpCat(@PathVariable String empcatId){
        return empCatService.returnEmpCat(empcatId);
    }
    //    create new employee category
    @PostMapping
    Boolean createNewEmployeeCategory(@RequestBody EmployeeCategory empCatData){
        return empCatService.createNewCategory(empCatData);
    }

//    delete employee category


}
