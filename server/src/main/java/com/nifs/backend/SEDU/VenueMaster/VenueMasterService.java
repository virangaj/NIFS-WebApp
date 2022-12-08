package com.nifs.backend.SEDU.VenueMaster;

import com.nifs.backend.SEDU.Charges.ChargeRepository;
import com.nifs.backend.SEDU.Charges.Charges;
import com.nifs.backend.SEDU.Facility.Facility;
import com.nifs.backend.SEDU.Facility.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class VenueMasterService {

    @Autowired
    private VenueMasterRepository venueRepo;
    @Autowired
    private FacilityRepository facRepo;
    @Autowired
    private ChargeRepository chargeRepo;

//    add facility
    public VenueMaster addFacility(String venueId, Facility[] facData) {
        Set<Facility> facilitySet = null;
        VenueMaster venueMaster = venueRepo.getVenue(venueId);
        facilitySet = venueMaster.getFacilities();
        for(Facility f: facData){
            Facility facility = facRepo.returnFacility(f.getFacilityId());
            facilitySet.add(facility);
        }
        venueMaster.setFacilities(facilitySet);
        return venueRepo.save(venueMaster);

    }
//    add charge
    public VenueMaster addCharge(String venueId, Charges[] chargeData) {
        Set<Charges> chargeSet = null;
        VenueMaster venueMaster = venueRepo.getVenue(venueId);
        chargeSet = venueMaster.getCharges();
        for(Charges c: chargeData){
            Charges charge = chargeRepo.returnCharge(c.getChargeId());
            chargeSet.add(charge);
        }
        venueMaster.setCharges(chargeSet);
        return venueRepo.save(venueMaster);

    }

    public Boolean createVenue(VenueMaster venueData){
        if(venueRepo.getVenue(venueData.getVenueId()) == null){
            Date d = new Date();
            venueData.setDateCreated(d);
            venueRepo.save(venueData);
            return true;
        }
        else{
            return false;
        }
    }

    public List<VenueMaster> getAll(){
        return venueRepo.findAll();
    }

    public String returnNewVenueId() {
        String lastId = venueRepo.returnLastId();
        String idText = lastId.replaceAll("[^A-Za-z]", "");
        int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

        idNum = idNum + 1;

        return idText + idNum;

    }


    public Boolean deleteVenue(String venueId) {
        VenueMaster venueMaster = venueRepo.getVenue(venueId);
        if (venueMaster != null) {
            venueRepo.deleteById(venueMaster.getId());
            return true;
        }
        return false;
    }
}
