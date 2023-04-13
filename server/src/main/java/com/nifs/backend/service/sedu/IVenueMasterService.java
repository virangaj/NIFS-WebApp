package com.nifs.backend.service.sedu;

import com.nifs.backend.dto.sedu.ResponseVenueMasterDTO;
import com.nifs.backend.dto.sedu.VenueMasterDTO;
import com.nifs.backend.model.sedu.VenueMaster;

import java.util.List;
import java.util.Optional;

public interface IVenueMasterService {
    //get new venue id
    String returnNewVenueId();

    //    get venue by id
    Optional<VenueMaster> returnVenue(String venueId);

    // get all venues
    List<ResponseVenueMasterDTO> getAll();
    //create new venue
    boolean createVenue(VenueMasterDTO venueData, String user);

    //    update venue
    Boolean updateVenue(String venueId, VenueMaster venueData);

    //delete venue
    Boolean deleteVenue(String venueId);
}
