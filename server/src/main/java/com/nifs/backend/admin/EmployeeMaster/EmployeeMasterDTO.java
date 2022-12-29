package com.nifs.backend.Admin.EmployeeMaster;


import com.nifs.backend.Admin.EmployeeDesignation.DesignationMaster;
import com.nifs.backend.Admin.Locations.Locations;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeMasterDTO {


    private int epfNo;
    private String initials;
    private String firstName;
//    private String lastName;
//    private String gender;
//    private Date dob;
//    private String address;
//    private  String contactNo;
//    private String email;
//    private String nicNo;
//    private String NicIssuedDate;
//    private String passportNo;
//    private String PassExpireDate;
//    private String licenseNo;
//    private String licenseIssuedDate;
//    private String licenseExpireDate;

    //    emergency contract person details
//    private String contactPerson;
//    private String cpRelationship;
//    private String cpAddress;
//    private String cpTelephone;
//    private String cpStatus;
//    private String cpCivilStatus;
//    private String cpReligion;

//    employee details


//    private String appointmentDate;
//    private String contractStart;
//    private String contractEnd;


    //relationships

    //district


    //employee type
    private String empType;

    //category
    private String empCategory;

    //designation
    private String designation;

    //division
    private String division;

    //locations
    private String location;
}
