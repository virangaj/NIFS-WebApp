package com.nifs.backend.admin.EmployeeMaster;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.admin.Division.DivisionMaster;
import com.nifs.backend.admin.EmployeeCategory.EmployeeCategory;
import com.nifs.backend.admin.EmployeeDesignation.DesignationMaster;
import com.nifs.backend.admin.EmployeeType.EmployeeTypeMaster;
import com.nifs.backend.admin.Locations.Locations;
import com.nifs.backend.admin.OtherData.District;
import com.nifs.backend.admin.OtherData.Province;
import com.nifs.backend.login.EmployeeLogin;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;

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

    @Column(name = "personal_email", length = 50)
    private String PersonalEmail;

    @Column(name = "gsuit_email", length = 50)
    private String GsuitEmail;

    @Column(name = "nic_no", length = 15)
    private String nicNo;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "nic_issued_date")
    private String NicIssuedDate;

    @Column(name = "passport_no",length = 50)
    private String passportNo;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="passport_expire_date")
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private String PassExpireDate;

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


    @Column(name = "is_delete")
    private Boolean isDelete;
    //relationships

    //district
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "district", referencedColumnName = "district_id")
    @JsonIgnoreProperties("employee")
    private District district;


    //province
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "province", referencedColumnName = "province_id")
    @JsonIgnoreProperties("employee")
    private Province province;

    //employee type
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "emp_type_id", referencedColumnName = "type_id", nullable = false)
    @JsonIgnoreProperties("employee")
    private EmployeeTypeMaster empType;

    //category
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "emp_category_id", referencedColumnName = "employee_category_code", nullable = false)
    @JsonIgnoreProperties("employee")
    private EmployeeCategory empCategory;


    //designation
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "designation_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties("employee")
    private DesignationMaster designation;

    //division
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "division_id", referencedColumnName = "division_id", nullable = false)
    @JsonIgnoreProperties("employee")
    private DivisionMaster division;

    //locations
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    @JsonIgnoreProperties("employee")
    private Locations location;


    //login
    @OneToOne(mappedBy = "employee")
    private EmployeeLogin empLogin;





}