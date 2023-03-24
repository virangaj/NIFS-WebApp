package com.nifs.backend.service.admin;

import com.nifs.backend.dto.admin.LocationDTO;
import com.nifs.backend.model.admin.Locations;

import java.util.List;

public interface ILocationService {

//    get all locations
    List<LocationDTO> returnAllLocations();
//    get new id
    String returnNewLocationId();

    //get location by id
    LocationDTO returnLocationById(String id);

    //    add locations
    Boolean createLocation(LocationDTO venLocData);

//    update location
    Boolean updateLocationData(String locationid, LocationDTO locData);

//delete location
    Boolean deleteLocation(String id);

    Locations getLocationById(String id);
}
