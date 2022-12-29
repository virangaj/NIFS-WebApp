package com.nifs.backend.admin.EmployeeDesignation;

import com.nifs.backend.admin.Locations.LocationRepository;
import com.nifs.backend.admin.Locations.Locations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
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
    public List<DesignationMasterDTO> getAllDesignations() {
        List<DesignationMaster> dm = desRepo.findAll();
        List<DesignationMasterDTO> dDTO = new ArrayList<DesignationMasterDTO>();
        for(DesignationMaster d : dm){
            DesignationMasterDTO dDTOSingle = new DesignationMasterDTO(d.getId(), d.getDesignationName(), d.getLocation().getLocationName());
            dDTO.add(dDTOSingle);
        }
        return dDTO;
    }

    // create designation
    public Boolean createDesignation(DesignationMasterDTO d) {
        if(desRepo.returnDesignation(d.getId()) == null){
            Date date = new Date();
            Locations l = locRepo.getLocation(d.getLocation());
            DesignationMaster dm = new DesignationMaster(d.getId(), d.getDesignationName(), date, l);
            desRepo.save(dm);
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

    //update designation
    public Boolean updateDesignation(String id, DesignationMasterDTO dto) {
        if(desRepo.returnDesignation(id) != null){
            Date d = new Date();
            desRepo.updateDesignation(dto.getDesignationName(), d, id);
            return true;
        }
        return false;

    }
}
