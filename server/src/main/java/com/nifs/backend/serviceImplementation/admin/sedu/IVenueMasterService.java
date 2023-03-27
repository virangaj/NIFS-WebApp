package com.nifs.backend.serviceImplementation.admin.sedu;

import com.nifs.backend.model.sedu.Charges;
import com.nifs.backend.model.sedu.Facility;
import com.nifs.backend.model.sedu.VenueCharge;
import com.nifs.backend.model.sedu.VenueMaster;

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
