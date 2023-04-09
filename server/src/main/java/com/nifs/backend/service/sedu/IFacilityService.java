package com.nifs.backend.service.sedu;

import com.nifs.backend.dto.sedu.FacilityDTO;
import com.nifs.backend.model.sedu.Facility;

import java.util.List;
import java.util.Optional;

public interface IFacilityService {
    //return new facility id
    String returnNewFacilityId();

    //get facility by id
    Optional<Facility> returnFacility(String facilityId);

    //return all facilities
    List<FacilityDTO> getAll();

    //    create facility
    FacilityDTO createFacility(FacilityDTO facData, String user);

    // update facility
    Boolean updateFacility(String facilityId, FacilityDTO facData, String user);
}
