package com.nifs.backend.admin.OtherData.repository;

import com.nifs.backend.admin.OtherData.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Integer> {
    @Query("select d from District d where d.province.provinceId = ?1 order by d.districtId")
    List<District> findDistrictByProvinceId(int provinceId);
    @Transactional
    @Modifying
    @Query("update District d set d.districtName = :districtName where d.districtId = :districtId")
    int updateDistrictNameByDistrictIdEquals(@Param("districtName") String districtName,
                                             @Param("districtId") int districtId);

    @Query(value="SELECT * FROM district_master WHERE district_name =?1", nativeQuery = true)
    District returnDistrict(String name);

    @Query(value="SELECT * FROM district_master WHERE district_id =?1", nativeQuery = true)
    District returnDistrictById(int id);
}
