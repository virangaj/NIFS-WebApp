package com.nifs.backend.admin.OtherData.repository;

import com.nifs.backend.admin.OtherData.entity.District;
import com.nifs.backend.admin.OtherData.entity.Province;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {
    @Query("select p from Province p where p.provinceId = :provinceId")
    Province findProvinceById(@Param("provinceId") int provinceId);

    @Query(value="SELECT * FROM province_master WHERE province_name =?1", nativeQuery = true)
    District returnProvince(String name);
}
