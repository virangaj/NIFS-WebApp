package com.nifs.backend.SEDU.Charges;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ChargeService {

    @Autowired
    ChargeRepository chargeRepo;

//    create new charge
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

//    return all charges
    public List<Charges> getAll(){
        return (List<Charges>) chargeRepo.findAll();
    }


//    return new charge id
    public String returnNewChargeId() {
        String lastId = chargeRepo.returnLastId();

        if(lastId == null){
            return "VMC001";
        }else{
            String idText = lastId.replaceAll("[^A-Za-z]", "");
            int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));
            idNum = idNum + 1;
            return idText + idNum;

        }
    }
//    get charge by id
    public Optional<Charges> returnCharge(String chargeId) {
        return chargeRepo.findById(chargeId);
    }

//    delete charge by id
    public Boolean deleteCharge(String chargeId) {

        Charges charge = chargeRepo.returnCharge(chargeId);
        if(charge != null){
            chargeRepo.deleteById(charge.getChargeId());
            return true;
        }
        return false;
    }

    public Boolean updateCharge(String chargeId, Charges chargeData) {
       if(chargeRepo.returnCharge(chargeId) != null){
           chargeRepo.Update(chargeData.getName(), chargeData.getCharge(), chargeId);
           return true;
       }
       else{
           return false;
       }
    }

//    public Charges editCharge(String chargeId, Charges chargeData) {
//        return chargeRepo.
//    }
}
