package com.nifs.backend.SEDU.Facility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FacilityService {

    @Autowired
    private FacilityRepository facRepo;

    public String createFacility(Facility facData){
        if(facRepo.returnFacility(facData.getFacilityId()) == null){
            Date d = new Date();
            facData.setDateCreated(d);
            facRepo.save(facData);
            return "Facility Added";

        } else {
            return "Facility cannot Added";
        }
    }

    public List<Facility> getAll() {
        return facRepo.findAll();
    }


    public String returnNewFacilityId() {
        String lastId = facRepo.returnLastId();
        String idText = lastId.replaceAll("[^A-Za-z]", "");
        int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));
        idNum = idNum + 1;

        return idText + idNum;
    }
}
