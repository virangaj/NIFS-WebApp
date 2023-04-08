package com.nifs.backend.service.sedu;

import com.nifs.backend.dto.sedu.ChargeDTO;
import com.nifs.backend.model.sedu.Charges;

import java.util.List;
import java.util.Optional;

public interface IChargeService {

    //create charge
    ChargeDTO createCharge(ChargeDTO chargeData, String user);
    //get all charges
    List<ChargeDTO> getAll();
    //return new charge
    String returnNewChargeId();

    //return charge by id
    Optional<Charges> returnCharge(String chargeId);
    //delete charge
    Boolean deleteCharge(String chargeId);

    //update charge
    Boolean updateCharge(String chargeId, ChargeDTO chargeData, String user);
}
