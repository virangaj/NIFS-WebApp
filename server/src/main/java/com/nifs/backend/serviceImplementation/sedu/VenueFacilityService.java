package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.dto.sedu.ChargeDTO;
import com.nifs.backend.dto.sedu.FacilityDTO;
import com.nifs.backend.model.sedu.*;
import com.nifs.backend.repository.sedu.FacilityRepository;
import com.nifs.backend.repository.sedu.VenueFacilityRepository;
import com.nifs.backend.service.sedu.IVenueFacilityService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class VenueFacilityService implements IVenueFacilityService {

    @Autowired
    private FacilityRepository facRepo;
    @Autowired
    private VenueFacilityRepository facilityRepository;
    @Autowired
    private FacilityService facilityService;
    @Override
    public boolean createNewFacilityForVenue(VenueMaster saved, List<String> facilityList, String user) {

        List<VenueFacility> venueFacilityList = new ArrayList<>();

        facilityList.forEach(f->{
            Facility facility = facRepo.returnFacility(f);
            venueFacilityList.add(VenueFacility.builder().venueMasterId(saved).facilityId(facility).createdOn(new Date()).createdBy(Integer.valueOf(user)).build());
        });

        List<VenueFacility> savedList = facilityRepository.saveAll(venueFacilityList);
        return savedList.size() >= 1;
    }

    @Override
    public List<FacilityDTO> getVenueFacilitiesByVenueId(String venueId) {
        //get all venue charges
        List<VenueFacility> venueChargeList = facilityRepository.findByVenueMasterId_VenueIdEquals(venueId);

        List<FacilityDTO> facilityDTOList = new ArrayList<>();
        venueChargeList.forEach(f->{
            facilityDTOList.add(facilityService.returnFacility(f.getFacilityId().getFacilityId()));
        });

        return facilityDTOList;
    }
}
