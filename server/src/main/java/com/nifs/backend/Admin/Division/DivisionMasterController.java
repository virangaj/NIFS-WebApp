package com.nifs.backend.Admin.Division;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @PostMapping
    private Boolean createDivision(@RequestBody DivisionMaster diviMasterData){
        return diviMasterService.createDivision(diviMasterData);
    }

    @DeleteMapping("/delete/{divisionId}")
    private Boolean deleteDivision(@PathVariable String divisionId){
        return diviMasterService.deleteDivision(divisionId);
    }

    @GetMapping("/newid")
    private String returnNewDivisionId(){
        return diviMasterService.returnNewDivisionId();
    }
}
