package com.nifs.backend.Admin.Locations;

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
}
