package com.nifs.backend.Admin.OtherData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {

    @Query(value="SELECT * FROM province_master WHERE province_name =?1", nativeQuery = true)
    District returnProvince();
}
