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

    @Id
    @Column(name = "epf_no")
    private int epfNo;

    @NonNull
    @Column(name = "emp_name")
    private String empName;

    @Column(name = "gender")
    private String gender;

    @Column(name = "dob")
    private Date dob;

    @Column(name = "address")
    private String address;

    @Column(name = "contact_no")
    private  String contactNo;

    @Column(name = "email")
    private String email;

    @Column(name = "nic_no")
    private String nicNo;

    @Column(name = "issued_date")
    private String issued_date;

    @Column(name = "passport_no")
    private String passporto;
}
