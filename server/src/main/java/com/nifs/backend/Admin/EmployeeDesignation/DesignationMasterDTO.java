package com.nifs.backend.Admin.EmployeeDesignation;

import com.nifs.backend.Admin.Locations.Locations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DesignationMasterDTO {

    private String id;
    private String designationName;
    private String location;


}
