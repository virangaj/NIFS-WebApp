package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.dto.sedu.ResponseVenueMasterDTO;
import com.nifs.backend.dto.sedu.VenueMasterDTO;
import com.nifs.backend.model.sedu.*;
import com.nifs.backend.repository.sedu.FacilityRepository;
import com.nifs.backend.repository.sedu.VenueMasterRepository;
import com.nifs.backend.service.sedu.IVenueChargeService;
import com.nifs.backend.service.sedu.IVenueFacilityService;
import com.nifs.backend.service.sedu.IVenueMasterService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VenueMasterService implements IVenueMasterService {

    @Autowired
    private VenueMasterRepository venueRepo;
    @Autowired
    private FacilityRepository facRepo;


    @Autowired
    private IVenueFacilityService venueFacilityService;

    @Autowired
    private IVenueChargeService venueChargeService;
    @Autowired
    private ModelMapper modelMapper;

    public boolean createVenue(VenueMasterDTO venueData, String user) {
        try {
            if (venueRepo.getVenue(venueData.getVenueId()) == null) {
                VenueMaster venueMaster = modelMapper.map(venueData, VenueMaster.class);
                Date d = new Date();
                venueMaster.setCreatedOn(new Date());
                venueMaster.setCreatedBy(Integer.valueOf(user));

                VenueMaster saved = venueRepo.save(venueMaster);

                //create charges
                boolean b = venueChargeService.createNewChargeForVenue(saved, venueData.getCharges(), user);
                //create facility
                boolean c = venueFacilityService.createNewFacilityForVenue(saved, venueData.getFacilities(), user);
                return true;
            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }


    public List<ResponseVenueMasterDTO> getAll() {
        try {
            List<VenueMaster> venueMasterList = venueRepo.findAll();

            List<ResponseVenueMasterDTO> venueMasterDTOS = new ArrayList<>();

            venueMasterList.forEach(venueMaster -> {
                ResponseVenueMasterDTO dto =  modelMapper.map(venueMaster, ResponseVenueMasterDTO.class);
                dto.setCharges(venueChargeService.getVenueChargesByVenueId(venueMaster.getVenueId()));
                dto.setFacilities(venueFacilityService.getVenueFacilitiesByVenueId(venueMaster.getVenueId()));
                venueMasterDTOS.add(dto);
            });

            return venueMasterDTOS;

        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }

    }

    public String returnNewVenueId() {
        try {
            String lastId = venueRepo.returnLastId();
            if (lastId != null) {
                String idText = lastId.replaceAll("[^A-Za-z]", "");
                int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

                idNum = idNum + 1;

                return idText + idNum;
            }
            else {
                return "VM1001";
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request cannot be completed";
        }

    }

    //delete venue
    public Boolean deleteVenue(String venueId) {
        try {
            VenueMaster venueMaster = venueRepo.getVenue(venueId);
            if (venueMaster != null) {
                venueRepo.deleteById(venueMaster.getVenueId());
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    //   get venue by id
    public Optional<VenueMaster> returnVenue(String venueId) {
        try {
            return venueRepo.findById(venueId);
        } catch (Exception e) {
            System.out.println(e.toString());
            return Optional.empty();
        }
    }

    //    update venue
    public Boolean updateVenue(String venueId, VenueMaster venueData) {
        try {
            if (venueRepo.getVenue(venueId) != null) {
                Date d = new Date();
                venueRepo.updateVenueMaster(venueData.getVenueName(), venueData.getType(), venueData.getCapacity(), venueData.getRemark(), venueData.getLocation(), venueData.getAvailability(), d, venueId);

                return true;
            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }







}
