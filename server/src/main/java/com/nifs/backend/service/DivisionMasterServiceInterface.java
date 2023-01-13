package com.nifs.backend.service;

import com.nifs.backend.dto.DivisionMasterDTO;
import com.nifs.backend.model.DivisionMaster;

import java.util.List;
import java.util.Optional;

public interface DivisionMasterServiceInterface {
    //    get all divisions
    List<DivisionMasterDTO> getAll();
    //create new divisions
    Boolean createDivision(DivisionMasterDTO d);

    //delete division
    Boolean deleteDivision(String divisionId);

    // return new id
    String returnNewDivisionId();
    //    return division by id
    Optional<DivisionMaster> returnDivision(String divisionId);

    //    update division master
    Boolean updateDivisionMaster(DivisionMasterDTO dmData, String dvId);

    // get divisions by location id
    List<DivisionMasterDTO> GetDivisionByLocationId(String locID);


    //get division by id
    DivisionMasterDTO getDivisionById(String id);
}
