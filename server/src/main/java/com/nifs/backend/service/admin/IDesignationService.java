package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.DesignationMasterDTO;
import com.nifs.backend.model.admin.DesignationMaster;

import java.util.List;

public interface IDesignationService {

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
    DesignationMasterDTO updateDesignation(String id, DesignationMasterDTO dto);

    //get designation by its id
    DesignationMasterDTO returnDesignationById(String id);
    public DesignationMaster returnDesignationMasterById(String id);
}
