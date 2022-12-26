package com.nifs.backend.Admin.Division;

import com.nifs.backend.Admin.Locations.LocationRepository;
import com.nifs.backend.Admin.Locations.Locations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DivisionMasterService {

    @Autowired
    private DivisionMasterRepository diviMasterRepo;

    @Autowired
    private LocationRepository locRepo;


//    get all divisions
    public List<DivisionMaster> getAll() {
        return diviMasterRepo.findAll();
    }


    //create new divisions
    public Boolean createDivision(DivisionMasterDTO d) {
        if (diviMasterRepo.returnDivision(d.getDivisionId()) == null) {

            Date date = new Date();
            Locations l = locRepo.getLocation(d.getLocationId());
            DivisionMaster dm = new DivisionMaster(d.getDivisionId(), d.getName(), date, l);
            diviMasterRepo.save(dm);
            return true;
        } else {
            return false;
        }

    }

//delete division
    public Boolean deleteDivision(String divisionId) {
        DivisionMaster divisionMaster = diviMasterRepo.returnDivision(divisionId);


        if (divisionMaster != null) {
            diviMasterRepo.deleteById(divisionMaster.getDivisionId());
            return true;
        } else {
            return false;
        }
    }

// return new id
    public String returnNewDivisionId() {
        String lastId = diviMasterRepo.returnLastId();
       if(lastId == null){
           return "DI1001";
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

     // get divisions by location id
    public List<DivisionMasterDTO> GetDivisionByLocationId(String locID) {
        if(locRepo.getLocation(locID) != null){
            List<DivisionMaster> dm =  diviMasterRepo.findDivisionByLocationId(locID);
            List<DivisionMasterDTO> dDTO = new ArrayList<DivisionMasterDTO>();
            for(DivisionMaster d : dm){
                DivisionMasterDTO dDTOSingle = new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocation().getLocationId());
                dDTO.add(dDTOSingle);
            }
            return dDTO;
        }
        return null;
    }
}
