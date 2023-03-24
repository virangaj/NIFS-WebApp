package com.nifs.backend.dto.admin;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeMasterDTO {


//    personal data
    private int epfNo;
    private String initials;
    private String firstName;
    private String lastName;
    private String gender;
    private String dob;
    private String address;
    private  String contactNo;
    private String personalEmail;
    private String gsuitEmail;

    private String nicNo;
    private String nicIssuedDate;
    private String passportNo;
    private String passExpireDate;
    private String licenseNo;
    private String licenseIssuedDate;
    private String licenseExpireDate;
    private Boolean isDelete;

    private String role;

    //    emergency contract person details
    private String contactPerson;
    private String cpRelationship;
    private String cpAddress;
    private String cpTelephone;
    private String cpStatus;
    private String cpCivilStatus;
    private String cpReligion;

//    employee details


    private String appointmentDate;
    private String contractStart;
    private String contractEnd;


    //relationships

    private String provinceId;
    private String districtId;

    //employee type
    private String empTypeId;

    //category
    private String empCatId;

    //designation
    private String designationId;

    //division
    private String divisionId;

    //locations
    private String locationId;


}
