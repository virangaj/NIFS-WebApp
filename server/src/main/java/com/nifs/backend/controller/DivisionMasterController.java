package com.nifs.backend.controller;

import com.nifs.backend.dto.DivisionMasterDTO;
import com.nifs.backend.model.DivisionMaster;
import com.nifs.backend.service.DivisionMasterServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("admin/division")
@CrossOrigin
public class DivisionMasterController {

    @Autowired
    private DivisionMasterServiceInterface divMasterService;
    @GetMapping
    private List<DivisionMasterDTO> getAll(){
        return divMasterService.getAll();
    }

    //    return division by id
    @GetMapping("/{divisionId}")
    Optional<DivisionMaster> returnDivision(@PathVariable String divisionId){
        return divMasterService.returnDivision(divisionId);
    }

//    return new id
    @GetMapping("/newid")
    private String returnNewDivisionId(){
        return divMasterService.returnNewDivisionId();
    }

    // det division by location id
    @GetMapping("/location/{locID}")
    private List<DivisionMasterDTO> getDivisionByLocationId(@PathVariable String locID){
        return divMasterService.GetDivisionByLocationId(locID);
    }

    //get division by its id
    @GetMapping("/get/{id}")
    private DivisionMasterDTO getDivisionById(@PathVariable String id){
        return divMasterService.getDivisionById(id);
    }

    //create division
    @PostMapping
    private Boolean createDivision(@RequestBody DivisionMasterDTO divMasterData){
        return divMasterService.createDivision(divMasterData);
    }

//    update division master
    @PatchMapping("/update/{dvId}")
    private Boolean updateDivisionMaster(@RequestBody DivisionMasterDTO dmData, @PathVariable String dvId){
        return divMasterService.updateDivisionMaster(dmData, dvId);
    }
//    delete division
    @DeleteMapping("/delete/{divisionId}")
    private Boolean deleteDivision(@PathVariable String divisionId){
        return divMasterService.deleteDivision(divisionId);
    }


}
