package com.nifs.backend.SEDU.Facility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacilityService {

    @Autowired
    private FacilityRepository facRepo;

    public String createFacility(Facility facData){
        if(facRepo.returnFacility(facData.getFacilityId()) == null){
            facRepo.save(facData);
            return "Facility Added";

        }
        else{
            return "Facility cannot Added";
        }
    }
    public List<Facility> getAll(){
        return facRepo.findAll();
    }


}
