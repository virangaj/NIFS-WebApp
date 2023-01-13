package com.nifs.backend.service;

import com.nifs.backend.model.VenueCharge;
import com.nifs.backend.model.VenueMaster;
import com.nifs.backend.repository.ChargeRepository;
import com.nifs.backend.model.Charges;
import com.nifs.backend.model.Facility;
import com.nifs.backend.repository.FacilityRepository;
import com.nifs.backend.repository.VenueChargeRepository;
import com.nifs.backend.repository.VenueMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class VenueMasterService implements VenueMasterServiceInterface {

    @Autowired
    private VenueMasterRepository venueRepo;
    @Autowired
    private FacilityRepository facRepo;
    @Autowired
    private ChargeRepository chargeRepo;

    @Autowired
    private VenueChargeRepository venChargeRepo;

    public Boolean createVenue(VenueMaster venueData) {
        if (venueRepo.getVenue(venueData.getVenueId()) == null) {
            Date d = new Date();
            venueData.setDateCreated(d);
            venueRepo.save(venueData);
            return true;
        } else {
            return false;
        }
    }

    //    add facility
    public VenueMaster addFacility(String venueId, Facility[] facData) {
        Set<Facility> facilitySet = null;
        VenueMaster venueMaster = venueRepo.getVenue(venueId);
        facilitySet = venueMaster.getFacilities();
        for (Facility f : facData) {
            Facility facility = facRepo.returnFacility(f.getFacilityId());
            facilitySet.add(facility);
        }
        venueMaster.setFacilities(facilitySet);
        return venueRepo.save(venueMaster);

    }


//    add charge
    public Boolean addCharge(String venueId, Charges[] chargeData) {

        VenueMaster venueMaster = venueRepo.getVenue(venueId);
        if(venueMaster != null){
            for(Charges c: chargeData){
                Date d = new Date();
                Charges charge = chargeRepo.returnCharge(c.getChargeId());
                if(charge != null){

                    VenueCharge venCharge = new VenueCharge(venueMaster, charge, d);
//                    venCharge.setVenueMaster(venueMaster);
//                    venCharge.setCharge(charge);
                    System.out.println("b");
                    venChargeRepo.save(venCharge);
                }
            }
            System.out.println("a");
            return true;
        }

//        venueMaster.setCharges(chargeSet);
//        return venueRepo.save(venueMaster);

        return false;
    }



    public List<VenueMaster> getAll(){
        return venueRepo.findAll();
    }

    public String returnNewVenueId() {
        String lastId = venueRepo.returnLastId();
        if (lastId != null) {
            String idText = lastId.replaceAll("[^A-Za-z]", "");
            int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

            idNum = idNum + 1;

            return idText + idNum;
        } else {
            return "VM1001";
        }

    }

    //delete venue
    public Boolean deleteVenue(String venueId) {
        VenueMaster venueMaster = venueRepo.getVenue(venueId);
        if (venueMaster != null) {
            venueRepo.deleteById(venueMaster.getVenueId());
            return true;
        }
        return false;
    }

    //   get venue by id
    public Optional<VenueMaster> returnVenue(String venueId) {
        return venueRepo.findById(venueId);
    }

    //    update venue
    public Boolean updateVenue(String venueId, VenueMaster venueData) {
        if (venueRepo.getVenue(venueId) != null) {
            Date d = new Date();
            venueRepo.updateVenueMaster(venueData.getVenueName(), venueData.getType(), venueData.getCapacity(), venueData.getRemark(), venueData.getLocation(), venueData.getAvailability(),d, venueId);

            return true;
        } else {
            return false;
        }
    }


    public VenueMaster removeFacility(String venueId, Facility facData) {
        VenueMaster venueMaster = venueRepo.getVenue(venueId);
        Facility facility = facRepo.returnFacility(facData.getFacilityId());
        if(venueMaster != null && facility != null) {
            Set<Facility> facilitySet = venueMaster.getFacilities();
            facilitySet.remove(facility);
            venueMaster.setFacilities(facilitySet);
            return venueRepo.save(venueMaster);
        }
        else {
            return null;
        }
    }

//    return all charges in a venue
    public List<VenueCharge> returnAllCharges() {
        return venChargeRepo.findAll();
    }

    public Optional<VenueCharge> returnAllChargesById(int id) {
        return venChargeRepo.returnVenueCharges(id);

    }
}
