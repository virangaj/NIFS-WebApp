package com.nifs.backend.service.sedu;

import com.nifs.backend.dto.sedu.ChargeDTO;
import com.nifs.backend.model.sedu.VenueMaster;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IVenueChargeService {
    boolean createNewChargeForVenue(VenueMaster saved, List<String> c, String user);


    List<ChargeDTO> getVenueChargesByVenueId(String venueId);
}
