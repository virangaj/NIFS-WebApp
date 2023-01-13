package com.nifs.backend.service;

import com.nifs.backend.model.EmployeeMaster;
import com.nifs.backend.repository.EmployeeMasterRepository;
import com.nifs.backend.repository.LocationRepository;
import com.nifs.backend.model.Locations;
import com.nifs.backend.dto.DivisionMasterDTO;
import com.nifs.backend.model.DivisionMaster;
import com.nifs.backend.repository.DivisionMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DivisionMasterService implements DivisionMasterServiceInterface{

    @Autowired
    private DivisionMasterRepository divMasterRepo;

    @Autowired
    private LocationRepository locRepo;

    @Autowired
    private EmployeeMasterRepository empRepo;
//    get all divisions
    public List<DivisionMasterDTO> getAll() {
        List<DivisionMaster> divData = divMasterRepo.findAll();
        List<DivisionMasterDTO> divDTO = new ArrayList<>();
        for(DivisionMaster d : divData){
            DivisionMasterDTO dto = new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationName());
            divDTO.add(dto);
        }
        return divDTO;
    }


    //create new divisions
    public Boolean createDivision(DivisionMasterDTO d) {
        if (divMasterRepo.returnDivision(d.getDivisionId()) == null) {

            Date date = new Date();
            Locations l = locRepo.getLocation(d.getLocationId());
            DivisionMaster dm = new DivisionMaster(d.getDivisionId(), d.getName(), date, l);
            divMasterRepo.save(dm);
            return true;
        } else {
            return false;
        }

    }

    //delete division
    public Boolean deleteDivision(String divisionId) {
        DivisionMaster divisionMaster = divMasterRepo.returnDivision(divisionId);

        List<EmployeeMaster> empMaster = empRepo.findByDivisionId(divisionId);
        for(EmployeeMaster e: empMaster){
            System.out.println("division "+e.getDivisionId().getDivisionId());
        }
        if (divisionMaster != null) {
            divMasterRepo.deleteById(divisionMaster.getDivisionId());
            return true;
        } else {
            return false;
        }
    }

// return new id
    public String returnNewDivisionId() {
        String lastId = divMasterRepo.returnLastId();
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
        return divMasterRepo.findById(divisionId);
    }

//    update division master
    public Boolean updateDivisionMaster(DivisionMasterDTO dmData, String dvId) {
        if(divMasterRepo.returnDivision(dvId) != null){
            Date d = new Date();
            divMasterRepo.updateDivisionMaster(dmData.getName(), d, dvId);
            return true;
        }else {
            return false;
        }
     }

     // get divisions by location id
    public List<DivisionMasterDTO> GetDivisionByLocationId(String locID) {
        if(locRepo.getLocation(locID) != null){
            List<DivisionMaster> dm =  divMasterRepo.findDivisionByLocationId(locID);
            List<DivisionMasterDTO> dDTO = new ArrayList<DivisionMasterDTO>();
            for(DivisionMaster d : dm){
                DivisionMasterDTO dDTOSingle = new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationId());
                dDTO.add(dDTOSingle);
            }
            return dDTO;
        }
        return null;
    }

    //get division by id
    public DivisionMasterDTO getDivisionById(String id) {
        DivisionMaster d = divMasterRepo.returnDivision(id);
        if(d != null){
            return new DivisionMasterDTO(d.getDivisionId(), d.getName(), d.getLocationId().getLocationId());
        }
        return null;
    }
}
