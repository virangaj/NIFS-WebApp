package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.DivisionMasterDTO;
import com.nifs.backend.model.admin.DivisionMaster;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IDivisionMasterService {
    //    get all divisions
    List<DivisionMasterDTO> getAll();
    //create new divisions
    DivisionMasterDTO createDivision(DivisionMasterDTO d);

    //delete division
    Boolean deleteDivision(String divisionId);

    // return new id
    String returnNewDivisionId();


    //    update division master
    Boolean updateDivisionMaster(DivisionMasterDTO dmData, String dvId);

    // get divisions by location id
    List<DivisionMasterDTO> GetDivisionByLocationId(String locID);


    //get division by id
    DivisionMasterDTO getDivisionById(String id);

    DivisionMaster returnDivision(String id);
}
