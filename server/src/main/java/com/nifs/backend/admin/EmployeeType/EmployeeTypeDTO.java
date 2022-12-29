package com.nifs.backend.Admin.EmployeeType;

import com.nifs.backend.Admin.Locations.Locations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeTypeDTO {
    private String typeId;
    private String typeName;
    private String location;


}
