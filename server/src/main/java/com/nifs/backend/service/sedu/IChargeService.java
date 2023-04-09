package com.nifs.backend.service.sedu;

import com.nifs.backend.dto.sedu.ChargeDTO;

import java.util.List;

public interface IChargeService {

    //create charge
    ChargeDTO createCharge(ChargeDTO chargeData, String user);
    //get all charges
    List<ChargeDTO> getAll();
    //return new charge
    String returnNewChargeId();

    //return charge by id
    ChargeDTO returnCharge(String chargeId);
    //delete charge
    Boolean deleteCharge(String chargeId);

    //update charge
    Boolean updateCharge(String chargeId, ChargeDTO chargeData, String user);
}
