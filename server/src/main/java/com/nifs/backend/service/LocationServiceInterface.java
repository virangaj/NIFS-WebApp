package com.nifs.backend.service;

import com.nifs.backend.dto.LocationDTO;
import com.nifs.backend.model.Locations;

import java.util.List;

public interface LocationServiceInterface {

//    get all locations
    List<LocationDTO> returnAllLocations();
//    get new id
    String returnNewLocationId();

    //get location by id
    LocationDTO returnLocationById(String id);

    //    add locations
    Boolean createLocation(Locations venLocData);

//    update location
    Boolean updateLocationData(String locationid, Locations locData);

//delete location
    Boolean deleteLocation(String id);
}
