package com.nifs.backend.Login;

import com.nifs.backend.Admin.EmployeeMaster.EmployeeMaster;
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
    @Column(name = "id", nullable = false)
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "epf_no", referencedColumnName = "epf_no", unique = true)
    private EmployeeMaster employee;

    @Column(name = "password", nullable = false)
    private String password;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="last_login")
    private Date lsatLogin;

}
