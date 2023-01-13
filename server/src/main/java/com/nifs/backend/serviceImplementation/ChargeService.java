package com.nifs.backend.serviceImplementation;

import com.nifs.backend.model.Charges;
import com.nifs.backend.repository.ChargeRepository;
import com.nifs.backend.service.ChargeServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ChargeService implements ChargeServiceInterface {

    @Autowired
    ChargeRepository chargeRepo;

//    create new charge
    public String createCharge(Charges chargeData) {
        try {
            if (chargeRepo.returnCharge(chargeData.getChargeId()) == null) {
                Date d = new Date();
                chargeData.setDateCreated(d);
                chargeRepo.save(chargeData);
                return "Charge is added";
            }
            else {
                return "Charges cannot added";
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request Cannot be Completed";
        }
    }

//    return all charges
    public List<Charges> getAll() {
        try {
            return (List<Charges>) chargeRepo.findAll();
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }


//    return new charge id
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
    public Optional<Charges> returnCharge(String chargeId) {
        try {
            return chargeRepo.findById(chargeId);
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

//    delete charge by id
    public Boolean deleteCharge(String chargeId) {

        try {
            Charges charge = chargeRepo.returnCharge(chargeId);
            if (charge != null) {
                chargeRepo.deleteByChargeIdLike(chargeId);
                return true;
            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

//    update charge data
    public Boolean updateCharge(String chargeId, Charges chargeData) {
        try {
            if (chargeRepo.returnCharge(chargeId) != null) {
                Date d = new Date();

                chargeRepo.Update(chargeData.getName(), chargeData.getCharge(), d, chargeId);
                return true;
            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

//    public Charges editCharge(String chargeId, Charges chargeData) {
//        return chargeRepo.
//    }
}
