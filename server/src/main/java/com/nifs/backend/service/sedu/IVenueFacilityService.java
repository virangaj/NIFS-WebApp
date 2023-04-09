package com.nifs.backend.service.sedu;

import com.nifs.backend.dto.sedu.FacilityDTO;
import com.nifs.backend.model.sedu.VenueMaster;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IVenueFacilityService {
    boolean createNewFacilityForVenue(VenueMaster saved, List<String> f, String user);

    List<FacilityDTO> getVenueFacilitiesByVenueId(String venueId);
}
