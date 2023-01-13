package com.nifs.backend.controller;

import com.nifs.backend.dto.DesignationMasterDTO;
import com.nifs.backend.service.DesignationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/designation")
@CrossOrigin
public class DesignationController {

    @Autowired
    private DesignationServiceInterface desService;

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

    //get designation by its id
    @GetMapping("/get/{id}")
    private DesignationMasterDTO returnDesignationById(@PathVariable String id){
        return desService.returnDesignationById(id);
    }

//    create designation
    @PostMapping
    private Boolean createDesignation(@RequestBody DesignationMasterDTO desData){
        return desService.createDesignation(desData);
    }



    //update designation
    @PatchMapping("/update/{id}")
    Boolean updateDesignation(@PathVariable String id, @RequestBody DesignationMasterDTO dto){
        return desService.updateDesignation(id, dto);
    }

    @DeleteMapping("/delete/{id}")
    private boolean deleteDesignation(@PathVariable String id) {
        return desService.deleteDesignation(id);
    }

}