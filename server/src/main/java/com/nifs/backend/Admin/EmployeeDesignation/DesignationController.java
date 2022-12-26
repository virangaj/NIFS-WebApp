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
    private List<DesignationMasterDTO> getAllDesignations(){
        return desService.getAllDesignations();
    }

    //return new id
    @GetMapping("/newid")
    private String returnNewId(){
        return desService.returnNewId();
    }

    //get designation by location id
    @GetMapping("/location/{locId}")
    private List<DesignationMasterDTO> getDesignationByLocationId(@PathVariable String locId){
        return desService.getDesignationByLocationId(locId);
    }

//    create designation
    @PostMapping
    private Boolean createDesignation(@RequestBody DesignationMasterDTO desData){
        return desService.createDesignation(desData);
    }

    @DeleteMapping("/delete/{id}")
    private boolean deleteDesignation(@PathVariable String id) {
        return desService.deleteDesignation(id);
    }

}
