package com.nifs.backend.SEDU.VenueMaster;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VenueMasterRepository extends JpaRepository<VenueMaster, String> {

//    @Query(value = "SELECT venue_id FROM venue_master ORDER BY venue_id DESC LIMIT 1", nativeQuery = true)
    @Query(value = "SELECT TOP 1 venue_id FROM venue_master ORDER BY venue_id DESC", nativeQuery = true)
    String returnLastId();

    @Query(value = "SELECT * FROM venue_master WHERE venue_id =?1", nativeQuery = true)
    VenueMaster getVenue(String id);

    @Query(value = "SELECT * FROM venue_master", nativeQuery = true)
    List<VenueMaster> returnAll();
}
