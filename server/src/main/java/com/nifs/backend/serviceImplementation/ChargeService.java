package com.nifs.backend.serviceImplementation;

import com.nifs.backend.model.Charges;
import com.nifs.backend.repository.ChargeRepository;
import com.nifs.backend.service.IChargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ChargeService implements IChargeService {

    @Autowired
    ChargeRepository chargeRepo;

    //    create new charge
    @Override
    public Charges createCharge(Charges chargeData) {

        if (chargeRepo.returnCharge(chargeData.getChargeId()) == null) {
            Date d = new Date();
            chargeData.setDateCreated(d);
            return chargeRepo.save(chargeData);

        }
        else {
            return null;
        }

    }

    //    return all charges
    @Override
    public List<Charges> getAll() {
        return (List<Charges>) chargeRepo.findAll();

    }


    //    return new charge id
    @Override
    public String returnNewChargeId() {
        try {
            String lastId = chargeRepo.returnLastId();

            if (lastId == null) {
                return "VMC001";
            }
            else {
                String idText = lastId.replaceAll("[^A-Za-z]", "");
                int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));
                idNum = idNum + 1;
                return idText + idNum;

            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request cannot be completed";
        }
    }

    //    get charge by id
    @Override
    public Optional<Charges> returnCharge(String chargeId) {
        return chargeRepo.findById(chargeId);

    }

    //    delete charge by id
    @Override
    public Boolean deleteCharge(String chargeId) {


        Charges charge = chargeRepo.returnCharge(chargeId);
        if (charge != null) {
            chargeRepo.deleteByChargeIdLike(chargeId);
            return true;
        }
        else {
            return false;
        }

    }

    //    update charge data
    @Override
    public Boolean updateCharge(String chargeId, Charges chargeData) {

        if (chargeRepo.returnCharge(chargeId) != null) {
            Date d = new Date();

            chargeRepo.Update(chargeData.getName(), chargeData.getCharge(), d, chargeId);
            return true;
        }
        else {
            return false;
            }
    }

//    public Charges editCharge(String chargeId, Charges chargeData) {
//        return chargeRepo.
//    }
}
