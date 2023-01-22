package com.nifs.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="login_details")
public class EmployeeLogin {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, length = 100, unique = true)
    private String id;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "epf_no", referencedColumnName = "epf_no", unique = true)
    private EmployeeMaster employee;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="last_login")
    private Date lastLogin;


}
