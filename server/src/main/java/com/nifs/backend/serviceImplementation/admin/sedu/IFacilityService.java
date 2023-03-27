package com.nifs.backend.serviceImplementation.admin.sedu;

import com.nifs.backend.model.sedu.Facility;

import java.util.List;
import java.util.Optional;

public interface IFacilityService {
    //return new facility id
    String returnNewFacilityId();

    //get facility by id
    Optional<Facility> returnFacility(String facilityId);

    //return all facilities
    List<Facility> getAll();

    //    create facility
    String createFacility(Facility facData);

    // update facility
    Boolean updateFacility(String facilityId, Facility facData);
}
