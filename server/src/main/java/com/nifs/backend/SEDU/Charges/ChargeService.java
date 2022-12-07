package com.nifs.backend.SEDU.Charges;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ChargeService {

    @Autowired
    ChargeRepository chargeRepo;

    public String createCharge(Charges chargeData){
        if(chargeRepo.returnCharge(chargeData.getChargeId()) == null){
            Date d = new Date();
            chargeData.setDateCreated(d);
            chargeRepo.save(chargeData);
            return "Charge is added";
        }
        else{
            return "Charges cannot added";
        }
    }

    public List<Charges> getAll(){
        return chargeRepo.findAll();
    }


}
