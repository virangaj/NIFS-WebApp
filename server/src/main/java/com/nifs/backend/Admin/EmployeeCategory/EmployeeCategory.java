package com.nifs.backend.Admin.EmployeeCategory;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee_category")
public class EmployeeCategory {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private int id;

    @Id
    @Column(name = "employee_category_code", nullable = false, length = 10)
    private String employeeCategoryId;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @Column(name = "ot_rate", nullable = false)
    private float otRate;


}
