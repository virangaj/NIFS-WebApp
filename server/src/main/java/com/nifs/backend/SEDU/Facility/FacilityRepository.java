package com.nifs.backend.SEDU.Facility;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FacilityRepository extends JpaRepository<Facility, String> {


    @Query(value="SELECT * FROM venue_facility_master WHERE facility_id =?1",nativeQuery = true)
    Facility returnFacility(String id);

//    @Query(value = "SELECT facility_id FROM venue_facility_master ORDER BY facility_id DESC LIMIT 1", nativeQuery = true)
    @Query(value = "SELECT TOP 1 facility_id FROM venue_facility_master ORDER BY facility_id DESC", nativeQuery = true)
    String returnLastId();
}
