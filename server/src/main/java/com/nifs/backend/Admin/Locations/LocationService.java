package com.nifs.backend.Admin.Locations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locRepo;

//    return all locations
    public List<Locations> returnAllLocations() {
        return locRepo.findAll();
    }

//    add new locations
    public Boolean createLocation(Locations venLocData) {
        if(locRepo.findById(venLocData.getLocationId()).isEmpty()){
            Date d = new Date();
            venLocData.setDateCreated(d);
            locRepo.save(venLocData);
            return true;
        }else{
            return false;
        }
    }


//    return new location id
    public String returnNewLocationId() {
        String lastId = locRepo.returnLastId();
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
    public Boolean updateLocationData(String locationid, Locations locData) {
        if(locRepo.findById(locationid).isPresent()){
            Date d = new Date();
           locRepo.updateLocation(locData.getLocationName(), d, locationid);
            return true;
        }else{
            return false;
        }
    }
}
