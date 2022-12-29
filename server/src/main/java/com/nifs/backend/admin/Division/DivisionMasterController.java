package com.nifs.backend.admin.Division;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("admin/division")
@CrossOrigin
public class DivisionMasterController {

    @Autowired
    private DivisionMasterService diviMasterService;
    @GetMapping
    private List<DivisionMasterDTO> getAll(){
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

    // det division by location id
    @GetMapping("/location/{locID}")
    private List<DivisionMasterDTO> GetDivisionByLocationId(@PathVariable String locID){
        return diviMasterService.GetDivisionByLocationId(locID);
    }

    //create division
    @PostMapping
    private Boolean createDivision(@RequestBody DivisionMasterDTO divMasterData){
        return diviMasterService.createDivision(divMasterData);
    }

//    update division master
    @PatchMapping("/update/{dvId}")
    private Boolean updateDivisionMaster(@RequestBody DivisionMasterDTO dmData, @PathVariable String dvId){
        return diviMasterService.updateDivisionMaster(dmData, dvId);
    }
//    delete division
    @DeleteMapping("/delete/{divisionId}")
    private Boolean deleteDivision(@PathVariable String divisionId){
        return diviMasterService.deleteDivision(divisionId);
    }


}
