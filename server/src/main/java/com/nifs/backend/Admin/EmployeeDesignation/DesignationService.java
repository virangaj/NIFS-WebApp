package com.nifs.backend.Admin.EmployeeDesignation;

import com.nifs.backend.Admin.Division.DivisionMaster;
import com.nifs.backend.Admin.Division.DivisionMasterDTO;
import com.nifs.backend.Admin.Locations.LocationRepository;
import com.nifs.backend.Admin.Locations.Locations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
            Locations l = locRepo.getLocation(desData.getLocation().getLocationId());
            desData.setLocation(l);
            //System.out.println(desData.getLocation().getLocationName());

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

    // get designation by location id
public List<DesignationMasterDTO> getDesignationByLocationId(String locId){
        if(locRepo.getLocation(locId) != null){
            List<DesignationMaster> dm = desRepo.findDesignatonByLocationId(locId);
            List<DesignationMasterDTO> dDTO = new ArrayList<DesignationMasterDTO>();
            for(DesignationMaster d : dm){
                DesignationMasterDTO dDTOSingle = new DesignationMasterDTO(d.getId(), d.getDesignationName(), d.getLocation().getLocationId());
                dDTO.add(dDTOSingle);
            }
            return dDTO;
        }
        return null;
    }

//    get new id
    public String returnNewId() {
        String lastId = desRepo.returnLastId();
        if (lastId != null) {
            String idText = lastId.replaceAll("[^A-Za-z]", "");
            int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

            idNum = idNum + 1;

            return idText + idNum;
        } else {
            return "ED1001";
        }
    }
}
