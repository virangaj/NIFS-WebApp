package com.nifs.backend.controller;



import com.nifs.backend.model.Charges;
import com.nifs.backend.service.ChargeServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sedu/charges")
@CrossOrigin
public class ChargeController {


    @Autowired
    ChargeServiceInterface chargeService;


    @GetMapping("/newid")
    String returnNewChargeId(){
        return chargeService.returnNewChargeId();
    }

//    get charge by id
    @GetMapping("/{chargeId}")
    Optional<Charges> returnCharge(@PathVariable String chargeId){
        return chargeService.returnCharge(chargeId);
    }

    @GetMapping
    List<Charges> returnData() {
        return chargeService.getAll();
    }

    //create new charge
    @PostMapping
    String createCharge(@RequestBody Charges chargeData) {
        return chargeService.createCharge(chargeData);
    }


    //    update charge
    @PutMapping("/update/{chargeId}")
    Boolean updateCharge(@PathVariable String chargeId, @RequestBody Charges chargeData) {
        return chargeService.updateCharge(chargeId, chargeData);
    }


    //    delete charge
    @DeleteMapping("/delete/{chargeId}")
    private Boolean deleteCharge(@PathVariable String chargeId) {
        return chargeService.deleteCharge(chargeId);
    }

}
