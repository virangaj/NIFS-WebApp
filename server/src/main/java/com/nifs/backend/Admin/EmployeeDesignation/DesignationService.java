package com.nifs.backend.Admin.EmployeeDesignation;

import com.nifs.backend.Admin.Locations.LocationRepository;
import com.nifs.backend.Admin.Locations.Locations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DesignationService {

    @Autowired
    private DesignationRepostory desRepo;

    @Autowired
    private LocationRepository locRepo;

//    get all designations
    public List<DesignationMaster> getAllDesignations() {
        return desRepo.findAll();
    }

    public Boolean createDesignation(DesignationMaster desData) {
        if(desRepo.returnDesignation(desData.getId()) == null){
            Date d = new Date();
            desData.setDateCreated(d);
//            System.out.println(desData.getLocation().getLocationId());
            desRepo.save(desData);
            return true;
        }
        return false;
    }

//    delete designation
    public boolean deleteDesignation(String id) {

        if(desRepo.returnDesignation(id) != null){
            desRepo.deleteDesignation(id);
            return true;
        }
        return false;
    }

    public String returnNewId() {
        String lastId = desRepo.returnLastId();
        if (lastId != null) {
            String idText = lastId.replaceAll("[^A-Za-z]", "");
            int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

            idNum = idNum + 1;

            return idText + idNum;
        } else {
            return "DM1001";
        }
    }
}
