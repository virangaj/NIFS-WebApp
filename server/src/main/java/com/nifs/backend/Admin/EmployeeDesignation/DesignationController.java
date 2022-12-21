package com.nifs.backend.Admin.EmployeeDesignation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin/designation")
public class DesignationController {

    @Autowired
    private DesignationService desService;

//    get all designations
    @GetMapping
    private List<DesignationMaster> getAllDesignations(){
        return desService.getAllDesignations();
    }

    @GetMapping("/newid")
    private String returnNewId(){
        return desService.returnNewId();
    }
//    create designation
    @PostMapping
    private Boolean createDesignation(@RequestBody DesignationMaster desData){
        return desService.createDesignation(desData);
    }

    @DeleteMapping("/delete/{id}")
    private boolean deleteDesignation(@PathVariable String id) {
        return desService.deleteDesignation(id);
    }

}
