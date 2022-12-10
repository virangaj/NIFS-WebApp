package com.nifs.backend.Admin.OtherData;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="province_master")
public class Province {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "province_id", nullable = false)
    private int provinceId;

    @Column(name="province_name")
    private String provinceName;

    @OneToMany(targetEntity = District.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "d_id", referencedColumnName = "province_id")
    @JsonIgnore
    private Set<District> districts;
}
