package com.nifs.backend.serviceImplementation;

import com.nifs.backend.model.Facility;
import com.nifs.backend.repository.FacilityRepository;
import com.nifs.backend.service.FacilityServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FacilityService implements FacilityServiceInterface {

    @Autowired
    private FacilityRepository facRepo;

    //create facility
    public String createFacility(Facility facData) {
        try {
            if (facRepo.returnFacility(facData.getFacilityId()) == null) {
                Date d = new Date();
                facData.setDateCreated(d);
                facRepo.save(facData);
                return "Facility Added";

            }
            else {
                return "Facility cannot Added";
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request cannot be completed";
        }
    }

    //get all facilities
    public List<Facility> getAll() {
        try {
            return facRepo.findAll();
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    //return new facility id
    public String returnNewFacilityId() {
        try {
            String lastId = facRepo.returnLastId();
            String idText = lastId.replaceAll("[^A-Za-z]", "");
            int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));
            idNum = idNum + 1;

            return idText + idNum;
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request Cannot be completed";
        }
    }
//    get facility by id
    public Optional<Facility> returnFacility(String facilityId) {
        try {
            return facRepo.findById(facilityId);
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    public Boolean updateFacility(String facilityId, Facility facData) {
        try {
            if (facRepo.returnFacility(facilityId) != null) {
                facRepo.update(facData.getName(), facilityId);
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
}
