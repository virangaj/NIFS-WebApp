package com.nifs.backend.service;

import com.nifs.backend.model.Charges;
import com.nifs.backend.model.Facility;
import com.nifs.backend.model.VenueCharge;
import com.nifs.backend.model.VenueMaster;

import java.util.List;
import java.util.Optional;

public interface IVenueMasterService {
    //get new venue id
    String returnNewVenueId();

    //    get venue by id
    Optional<VenueMaster> returnVenue(String venueId);

    //return all charges
    List<VenueCharge> returnAllCharges();
    //return all charges by id
    Optional<VenueCharge> returnAllChargesById(int id);
    // get all venues
    List<VenueMaster> getAll();
    //create new venue
    Boolean createVenue(VenueMaster venueData);
    //    put facilities
    VenueMaster addFacility(String venueId, Facility[] facData);
    //    update venue
    Boolean updateVenue(String venueId, VenueMaster venueData);
    //    put charges
    Boolean addCharge(String venueId, Charges[] chargeData);
    //delete venue
    Boolean deleteVenue(String venueId);
    //remove facility
    VenueMaster removeFacility(String venueId, Facility facData);
}
