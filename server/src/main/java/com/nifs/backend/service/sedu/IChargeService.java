package com.nifs.backend.service.sedu;

import com.nifs.backend.model.sedu.Charges;

import java.util.List;
import java.util.Optional;

public interface IChargeService {

    //create charge
    Charges createCharge(Charges chargeData);
    //get all charges
    List<Charges> getAll();
    //return new charge
    String returnNewChargeId();

    //return charge by id
    Optional<Charges> returnCharge(String chargeId);
    //delete charge
    Boolean deleteCharge(String chargeId);

    //update charge
    Boolean updateCharge(String chargeId, Charges chargeData);
}
