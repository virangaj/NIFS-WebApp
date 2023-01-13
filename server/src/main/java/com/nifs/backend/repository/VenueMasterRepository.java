package com.nifs.backend.repository;

import com.nifs.backend.model.VenueMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface VenueMasterRepository extends JpaRepository<VenueMaster, String> {


//    update venue master
    @Transactional
    @Modifying
    @Query("""
            UPDATE VenueMaster v set v.venueName = :venueName, v.type = :type, v.capacity = :capacity, v.remark = :remark, v.location = :location, v.availability = :availability, v.dateUpdated =:dateUpdated
            WHERE v.venueId LIKE :venueId""")
    void updateVenueMaster(
            @Param("venueName") String venueName, @Param("type") String type, @Param("capacity") int capacity,
            @Param("remark") String remark, @Param("location") String location,
            @Param("availability") String availability, @Param("dateUpdated") Date dateUpdated , @Param("venueId") String venueId);

//    @Query(value = "SELECT venue_id FROM venue_master ORDER BY venue_id DESC LIMIT 1", nativeQuery = true)
    @Query(value = "SELECT TOP 1 venue_id FROM venue_master ORDER BY venue_id DESC", nativeQuery = true)
    String returnLastId();

    @Query(value = "SELECT * FROM venue_master WHERE venue_id =?1", nativeQuery = true)
    VenueMaster getVenue(String id);

    @Query(value = "SELECT * FROM venue_master", nativeQuery = true)
    List<VenueMaster> returnAll();



}
