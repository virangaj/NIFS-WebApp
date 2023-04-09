package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.dto.sedu.ChargeDTO;
import com.nifs.backend.model.sedu.Charges;
import com.nifs.backend.repository.sedu.ChargeRepository;
import com.nifs.backend.service.sedu.IChargeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChargeService implements IChargeService {

    @Autowired
    ChargeRepository chargeRepo;

    @Autowired
    private ModelMapper modelMapper;
    //    create new charge
    @Override
    public ChargeDTO createCharge(ChargeDTO chargeData, String user) {

        if (chargeRepo.returnCharge(chargeData.getChargeId()) == null) {

            Charges charges = modelMapper.map(chargeData, Charges.class);

            charges.setCreatedOn(new Date());
            charges.setCreatedBy(Integer.valueOf(user));
            return modelMapper.map(chargeRepo.save(charges), ChargeDTO.class);

        }
        else {
            return null;
        }

    }

    //    return all charges
    @Override
    public List<ChargeDTO> getAll() {
        List<Charges> chargesList = (List<Charges>) chargeRepo.findAll();

        List<ChargeDTO> chargeDTOList = new ArrayList<>();
        chargesList.forEach(charges -> {
            chargeDTOList.add(modelMapper.map(charges, ChargeDTO.class));
        });
        return chargeDTOList;


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
    public ChargeDTO returnCharge(String chargeId) {
     return  modelMapper.map(chargeRepo.save(Objects.requireNonNull(chargeRepo.findById(chargeId).orElse(null))), ChargeDTO.class);

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
    public Boolean updateCharge(String chargeId, ChargeDTO chargeData, String user) {

        if (chargeRepo.returnCharge(chargeId) != null) {
            Date d = new Date();

            chargeRepo.Update(chargeData.getName(), chargeData.getCharge(), d, chargeId, Integer.parseInt(user));
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
