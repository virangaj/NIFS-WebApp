package com.nifs.backend.Login;

import jakarta.persistence.*;
import lombok.*;

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

}
