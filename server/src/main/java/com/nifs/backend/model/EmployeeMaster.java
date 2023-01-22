package com.nifs.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nifs.backend.constant.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

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

    @Column(name = "gender", length = 6)
    private String gender;
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "dob")
    private String dob;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "contact_no", length = 15)
    private  String contactNo;

    @Column(name = "personal_email", length = 50)
    private String personalEmail;

    @Column(name = "gsuit_email", length = 50)
    private String gsuitEmail;

    @Column(name = "nic_no", length = 15)
    private String nicNo;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "nic_issued_date")
    private String nicIssuedDate;

    @Column(name = "passport_no",length = 50)
    private String passportNo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="passport_expire_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String passExpireDate;

    @Column(name = "license_no", length = 50)
    private String licenseNo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="license_issued_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String licenseIssuedDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="license_expire_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String licenseExpireDate;


    @Column(name = "is_delete")
    private Boolean isDelete;

    @Column(name = "status")
    private String role = String.valueOf(UserRole.USER);


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
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String appointmentDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "contract_start_on")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String contractStart;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "contract_end_on")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String contractEnd;


    //relationships

    //district
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "district", referencedColumnName = "district_id")
    private District districtId;


    //province
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "province", referencedColumnName = "province_id")
    private Province provinceId;

    //employee type
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "emp_type_id", referencedColumnName = "emp_type_id")
    private EmployeeTypeMaster empTypeId;

    //category
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "emp_category_id", referencedColumnName = "employee_category_code")
    private EmployeeCategory empCatId;


    //designation
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "designation_id", referencedColumnName = "designation_id")
    private DesignationMaster designationId;

    //division
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "division_id", referencedColumnName = "division_id")
    private DivisionMaster divisionId;

    //locations
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id")
    private Locations locationId;


    //login
    @OneToOne(mappedBy = "employee", cascade = {CascadeType.REMOVE})
    private EmployeeLogin empLogin;


    public EmployeeMaster(int epfNo, String initials, String firstName, String lastName, String gender, String dob, String address, String contactNo, String personalEmail, String gsuitEmail, String nicNo, String nicIssuedDate, String passportNo, String passExpireDate, String licenseNo, String licenseIssuedDate, String licenseExpireDate, String contactPerson, String cpRelationship, String cpAddress, String cpTelephone, String cpStatus, String cpCivilStatus, String cpReligion, String appointmentDate, String contractStart, String contractEnd, Boolean isDelete, District districtId, Province provinceId, EmployeeTypeMaster empTypeId, EmployeeCategory empCatId, DesignationMaster designationId, DivisionMaster divisionId, Locations locationId) {
        this.epfNo = epfNo;
        this.initials = initials;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dob = dob;
        this.address = address;
        this.contactNo = contactNo;
        this.personalEmail = personalEmail;
        this.gsuitEmail = gsuitEmail;
        this.nicNo = nicNo;
        this.nicIssuedDate = nicIssuedDate;
        this.passportNo = passportNo;
        this.passExpireDate = passExpireDate;
        this.licenseNo = licenseNo;
        this.licenseIssuedDate = licenseIssuedDate;
        this.licenseExpireDate = licenseExpireDate;
        this.contactPerson = contactPerson;
        this.cpRelationship = cpRelationship;
        this.cpAddress = cpAddress;
        this.cpTelephone = cpTelephone;
        this.cpStatus = cpStatus;
        this.cpCivilStatus = cpCivilStatus;
        this.cpReligion = cpReligion;
        this.appointmentDate = appointmentDate;
        this.contractStart = contractStart;
        this.contractEnd = contractEnd;
        this.isDelete = isDelete;
        this.districtId = districtId;
        this.provinceId = provinceId;
        this.empTypeId = empTypeId;
        this.empCatId = empCatId;
        this.designationId = designationId;
        this.divisionId = divisionId;
        this.locationId = locationId;
    }





}
