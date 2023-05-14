package com.nifs.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LocationDTO {


    private String locationId;
    private String locationName;
    private String address;
    private String telNo;
    private String faxNo;

    public LocationDTO(String locationId, String locationName) {
        this.locationId = locationId;
        this.locationName = locationName;
    }
}
