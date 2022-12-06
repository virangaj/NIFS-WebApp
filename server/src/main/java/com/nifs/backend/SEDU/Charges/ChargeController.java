package com.nifs.backend.SEDU.Charges;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sedu/charges")
@CrossOrigin
public class ChargeController {


    @Autowired
    ChargeService chargeService;

    @PostMapping
    String createCharge(@RequestBody Charges chargeData){
        return chargeService.createCharge(chargeData);
    }

    @GetMapping
    List<Charges> returnData(){
        return chargeService.getAll();
    }
}
