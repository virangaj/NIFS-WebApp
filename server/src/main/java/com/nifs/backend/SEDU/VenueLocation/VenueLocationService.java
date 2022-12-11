package com.nifs.backend.SEDU.VenueLocation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class VenueLocationService {

    @Autowired
    private VenueLocationRepository venLocRepo;

//    return all locations
    public List<VenueLocation> returnAllLocations() {
        return venLocRepo.findAll();
    }

//    add new locations
    public Boolean createLocation(VenueLocation venLocData) {
        if(venLocRepo.findById(venLocData.getLocationId()).isEmpty()){
            Date d = new Date();
            venLocData.setDateCreated(d);
            venLocRepo.save(venLocData);
            return true;
        }else{
            return false;
        }
    }


//    return new location id
    public String returnNewLocationId() {
        String lastId = venLocRepo.returnLastId();
        if (lastId != null) {
            String idText = lastId.replaceAll("[^A-Za-z]", "");
            int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

            idNum = idNum + 1;

            return idText + idNum;
        } else {
            return "VLM1001";
        }
    }

//    update location data
    public Boolean updateLocationData(String locationid, VenueLocation venlocData) {
        if(venLocRepo.findById(locationid).isPresent()){
            venLocRepo.updateLocation(venlocData.getLocationName(), locationid);
            return true;
        }else{
            return false;
        }
    }
}
