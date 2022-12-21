package com.nifs.backend.Admin.EmployeeMaster;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee_master")
public class EmployeeMaster {


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private int id;

//    personal details
    @Id
    @Column(name = "epf_no", nullable = false)
    private int epfNo;

    @Column(name = "initials", length = 100)
    private String initials;

    @Column(name = "first_name", length = 150)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "gender", length = 5)
    private String gender;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "contact_no", length = 15)
    private  String contactNo;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "nic_no", length = 15)
    private String nicNo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "nic_issued_date")
    private String NicIssuedDate;

    @Column(name = "passport_no",length = 50)
    private String passportNo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="passport_expire_date")
    private String PassExpireDate;

    @Column(name = "license_no", length = 50)
    private String licenseNo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="license_issued_date")
    private String licenseIssuedDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="license_expire_date")
    private String licenseExpireDate;

//    emergency contract person details
    @Column(name = "contact_person", length = 255)
    private String contactPerson;

    @Column(name = "cp_relationship", length = 100)
    private String cpRelationship;

    @Column(name = "cp_address", length = 255)
    private String cpAddress;

    @Column(name = "cp_tp", length = 15)
    private String cpTelephone;

    @Column(name = "cp_status", length = 10)
    private String cpStatus;

    @Column(name = "cp_civil_status", length = 10)
    private String cpCivilStatus;

    @Column(name = "cp_religion", length = 255)
    private String cpReligion;



//    employee details

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "appointment_date")
    private String appointmentDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "contract_start_on")
    private String contractStart;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "contract_end_on")
    private String contractEnd;


    //relationships



}
