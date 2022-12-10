package com.nifs.backend.Admin.OtherData;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

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

    @Column(name="district_name")
    private String districtName;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "province_id", referencedColumnName = "province_id", nullable = false)
    @JsonIgnore
    private Province province;

}
