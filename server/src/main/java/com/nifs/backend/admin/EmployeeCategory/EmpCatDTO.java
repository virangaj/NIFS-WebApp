package com.nifs.backend.Admin.EmployeeCategory;

import com.nifs.backend.Admin.Locations.Locations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmpCatDTO {
    private String employeeCategoryId;
    private String description;
    private String otRate;
    private String location;


}
