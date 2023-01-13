package com.nifs.backend.service;

import com.nifs.backend.model.Charges;

import java.util.List;
import java.util.Optional;

public interface ChargeServiceInterface {

    String createCharge(Charges chargeData);
    List<Charges> getAll();
    String returnNewChargeId();
    Optional<Charges> returnCharge(String chargeId);
    Boolean deleteCharge(String chargeId);
    Boolean updateCharge(String chargeId, Charges chargeData);
}
