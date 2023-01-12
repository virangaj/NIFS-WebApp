package com.nifs.backend.admin.EmployeeMaster;


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

    private String province;
    private String district;

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
