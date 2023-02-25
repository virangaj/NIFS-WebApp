package com.nifs.backend.repository;

import com.nifs.backend.model.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface FacilityRepository extends JpaRepository<Facility, String> {
    @Transactional
    @Modifying
    @Query("update Facility f set f.name = :name where f.facilityId like :facilityId")
    void update(@Param("name") String name, @Param("facilityId") String facilityId);


    @Query(value="SELECT * FROM venue_facility_master WHERE facility_id =?1",nativeQuery = true)
    Facility returnFacility(String id);

    @Query(value = "SELECT facility_id FROM venue_facility_master ORDER BY facility_id DESC LIMIT 1", nativeQuery = true)
//    @Query(value = "SELECT TOP 1 facility_id FROM venue_facility_master ORDER BY facility_id DESC", nativeQuery = true)
    String returnLastId();
}
