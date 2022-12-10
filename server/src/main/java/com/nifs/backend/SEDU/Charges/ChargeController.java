package com.nifs.backend.SEDU.Charges;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sedu/charges")
@CrossOrigin
public class ChargeController {


    @Autowired
    ChargeService chargeService;


    @GetMapping("/newid")
    String returnNewChargeId(){
        return chargeService.returnNewChargeId();
    }

//    @PutMapping("/edit/{chargeId}")
//    Charges editCharge(@PathVariable String chargeId, @RequestBody Charges chargeData){
//        return chargeService.editCharge(chargeId, chargeData);
//    }

//    get charge by id

    @GetMapping("/{chargeId}")
    Optional<Charges> returnCharge(@PathVariable String chargeId){
        return chargeService.returnCharge(chargeId);
    }

    @GetMapping
    List<Charges> returnData(){
        return chargeService.getAll();
    }

//create new charge
    @PostMapping
    String createCharge(@RequestBody Charges chargeData){
        return chargeService.createCharge(chargeData);
    }

//    delete charge
    @DeleteMapping("/delete/{chargeId}")
    private Boolean deleteCharge(@PathVariable String chargeId){
        return chargeService.deleteCharge(chargeId);
    }

}
