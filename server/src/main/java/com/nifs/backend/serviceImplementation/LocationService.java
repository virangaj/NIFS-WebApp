package com.nifs.backend.serviceImplementation;

import com.nifs.backend.dto.LocationDTO;
import com.nifs.backend.model.Locations;
import com.nifs.backend.repository.LocationRepository;
import com.nifs.backend.service.LocationServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class LocationService implements LocationServiceInterface {

    @Autowired
    private LocationRepository locRepo;

//    return all locations
    public List<LocationDTO> returnAllLocations() {
        try {
            List<Locations> locData = locRepo.findAll();
            List<LocationDTO> dto = new ArrayList<>();
            for (Locations l : locData) {
                LocationDTO single = new LocationDTO(l.getLocationId(), l.getLocationName(), l.getAddress(), l.getTelNo(), l.getFaxNo());
                dto.add(single);
            }
            return dto;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }


    }

//    add new locations
    public Boolean createLocation(Locations venLocData) {
        try {
            if (locRepo.findById(venLocData.getLocationId()).isEmpty()) {
                Date d = new Date();
                venLocData.setDateCreated(d);
                locRepo.save(venLocData);
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


//    return new location id
    public String returnNewLocationId() {
        try {
            String lastId = locRepo.returnLastId();
            if (lastId != null) {
                String idText = lastId.replaceAll("[^A-Za-z]", "");
                int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

                idNum = idNum + 1;

                return idText + idNum;
            }
            else {
                return "VLM1001";
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request cannot be completed";
        }
    }

//    update location data
    public Boolean updateLocationData(String locationid, Locations locData) {
        try {
            if (locRepo.findById(locationid).isPresent()) {
                Date d = new Date();
                locRepo.updateLocation(locData.getLocationName(), locData.getAddress(), locData.getTelNo(), locData.getFaxNo(), d, locationid);
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

    //delete locations
    public Boolean deleteLocation(String id) {
        try {
            if (locRepo.getLocation(id) != null) {
                locRepo.deleteLocation(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

//    return location by id
    public LocationDTO returnLocationById(String id) {
        try {
            Locations l = locRepo.getLocation(id);
            if (l != null) {
                return new LocationDTO(l.getLocationId(), l.getLocationName());
            }
            return null;
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }
}
