package com.nifs.backend.Admin.Division;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DivisionMasterService {

    @Autowired
    private DivisionMasterRepository diviMasterRepo;

    public List<DivisionMaster> getAll() {
        return diviMasterRepo.findAll();
    }

    public Boolean createDivision(DivisionMaster diviMasterData) {
        if (diviMasterRepo.returnDivision(diviMasterData.getDivisionId()) == null) {
            Date d = new Date();
            diviMasterData.setCreatedDate(d);
            diviMasterRepo.save(diviMasterData);
            return true;
        } else {
            return false;
        }

    }


    public Boolean deleteDivision(String divisionId) {
        DivisionMaster divisionMaster = diviMasterRepo.returnDivision(divisionId);


        if (divisionMaster != null) {
            diviMasterRepo.deleteById(divisionMaster.getDivisionId());
            return true;
        } else {
            return false;
        }
    }

    public String returnNewDivisionId() {
        String lastId = diviMasterRepo.returnLastId();
       if(lastId == null){
           return "DM1001";
       }
       else{
           String idText = lastId.replaceAll("[^A-Za-z]", "");
           int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

           idNum = idNum + 1;

           return idText + idNum;
       }
    }

//    return division by id
    public Optional<DivisionMaster> returnDivision(String divisionId) {
        return diviMasterRepo.findById(divisionId);
    }

//    update division master
    public Boolean updateDivisionMaster(DivisionMaster dmData, String dvId) {
        if(diviMasterRepo.returnDivision(dvId) != null){
            Date d = new Date();
            diviMasterRepo.updateDivisionMaster(dmData.getName(), d, dvId);
            return true;
        }else {
            return false;
        }
     }
}
