package com.nifs.backend.service;

import com.nifs.backend.dto.DesignationMasterDTO;
import com.nifs.backend.model.DesignationMaster;

import java.util.List;

public interface DesignationServiceInterface {

    //    get all designations
    List<DesignationMasterDTO> getAllDesignations();

    // create designation
    boolean createDesignation(DesignationMasterDTO d);

    //    delete designation
    boolean deleteDesignation(String id);

    // get designation by location id
    List<DesignationMasterDTO> getDesignationByLocationId(String locId);

    //    get new id
    String returnNewId();
    //update designation
    Boolean updateDesignation(String id, DesignationMasterDTO dto);

    //get designation by its id
    DesignationMasterDTO returnDesignationById(String id);

}
