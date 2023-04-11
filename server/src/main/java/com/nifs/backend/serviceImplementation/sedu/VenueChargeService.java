package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.dto.sedu.ChargeDTO;
import com.nifs.backend.model.sedu.Charges;
import com.nifs.backend.model.sedu.VenueCharge;
import com.nifs.backend.model.sedu.VenueFacility;
import com.nifs.backend.model.sedu.VenueMaster;
import com.nifs.backend.repository.sedu.ChargeRepository;
import com.nifs.backend.repository.sedu.VenueChargeRepository;
import com.nifs.backend.service.sedu.IChargeService;
import com.nifs.backend.service.sedu.IVenueChargeService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class VenueChargeService implements IVenueChargeService {
    @Autowired
    private ChargeRepository chargeRepo;
    @Autowired
    private IChargeService chargeService;

    @Autowired
    private VenueChargeRepository venueChargeRepository;


    @Override
    public boolean createNewChargeForVenue(VenueMaster saved, List<String> chargesList, String user) {

        List<VenueCharge> venueChargeList = new ArrayList<>();

        chargesList.forEach(c->{
            Charges charges = chargeRepo.returnCharge(c);
            VenueCharge single = VenueCharge.builder().venueMasterId(saved).chargeId(charges).createdOn(new Date()).createdBy(Integer.valueOf(user)).build();
            venueChargeList.add(single);
//            venueChargeRepository.save(VenueCharge.builder().venueMasterId(saved).chargeId(charges).createdOn(new Date()).createdBy(Integer.valueOf(user)).build());
        });

        List<VenueCharge> savedList = venueChargeRepository.saveAll(venueChargeList);
        return savedList.size() >= 1;
    }

    @Override
    public List<ChargeDTO> getVenueChargesByVenueId(String venueId) {

        //get all venue charges
        List<VenueCharge> venueChargeList = venueChargeRepository.findByVenueMasterId_VenueIdEquals(venueId);

        List<ChargeDTO> chargeDTOList = new ArrayList<>();
        venueChargeList.forEach(c->{
           chargeDTOList.add(chargeService.returnCharge(c.getChargeId().getChargeId()));
        });

        return chargeDTOList;
    }


}
