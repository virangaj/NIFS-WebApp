package com.nifs.backend.Admin.Division;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DivisionMasterService {

    @Autowired
    private DivisionMasterRepository diviMasterRepo;

    public List<DivisionMaster> getAll() {
        return diviMasterRepo.findAll();
    }

    public Boolean createDivision(DivisionMaster diviMasterData) {
        if (diviMasterRepo.getDivisionById(diviMasterData.getDivisionId()) == null) {
            Date d = new Date();
            diviMasterData.setCreatedDate(d);
            diviMasterRepo.save(diviMasterData);
            return true;
        } else {
            return false;
        }

    }


    public Boolean deleteDivision(String divisionId) {
        DivisionMaster divisionMaster = diviMasterRepo.getDivisionById(divisionId);

        if (divisionMaster != null) {
            diviMasterRepo.deleteById(divisionMaster.getId());
            return true;
        } else {
            return false;
        }
    }

    public String returnNewDivisionId() {
        String lastId = diviMasterRepo.returnLastId();
        String idText = lastId.replaceAll("[^A-Za-z]", "");
        int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

        idNum = idNum + 1;

        return idText + idNum;
    }
}
