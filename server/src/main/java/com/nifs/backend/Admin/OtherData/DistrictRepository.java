package com.nifs.backend.Admin.OtherData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DistrictRepository extends JpaRepository<District, Integer> {

    @Query(value="SELECT * FROM district_master WHERE district_name =?1", nativeQuery = true)
    District returnDistrict();
}
