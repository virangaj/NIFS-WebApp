package com.nifs.backend.Admin.Division;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("admin/divisionmaster")
@CrossOrigin
public class DivisionMasterController {

    @Autowired
    private DivisionMasterService diviMasterService;
    @GetMapping
    private List<DivisionMaster> getAll(){
        return diviMasterService.getAll();
    }

    //    return division by id
    @GetMapping("/{divisionId}")
    Optional<DivisionMaster> returnDivision(@PathVariable String divisionId){
        return diviMasterService.returnDivision(divisionId);
    }

//    return new id
    @GetMapping("/newid")
    private String returnNewDivisionId(){
        return diviMasterService.returnNewDivisionId();
    }


    //create division
    @PostMapping
    private Boolean createDivision(@RequestBody DivisionMaster diviMasterData){
        return diviMasterService.createDivision(diviMasterData);
    }

//    delete division
    @DeleteMapping("/delete/{divisionId}")
    private Boolean deleteDivision(@PathVariable String divisionId){
        return diviMasterService.deleteDivision(divisionId);
    }


}
