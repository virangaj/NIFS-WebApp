package com.nifs.backend.admin.OtherData.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.admin.EmployeeMaster.EmployeeMaster;
import com.nifs.backend.admin.OtherData.entity.Province;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="district_master")
public class District {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "district_id", nullable = false)
    private int districtId;

    @Column(name="district_name", length = 30)
    private String districtName;

    //Relationship


    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "province_id", referencedColumnName = "province_id", nullable = false)
    @JsonIgnoreProperties("districts")
    private Province province;

    @OneToMany(mappedBy = "district", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("district")
    private List<EmployeeMaster> employee;



}
