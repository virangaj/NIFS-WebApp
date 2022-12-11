package com.nifs.backend.SEDU.VenueLocation;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface VenueLocationRepository extends JpaRepository<VenueLocation, String> {
    @Transactional
    @Modifying
    @Query("update VenueLocation v set v.locationName = :locationName where v.locationId like :locationId")
    void updateLocation(@Param("locationName") String locationName, @Param("locationId") String locationId);

    @Query(value = "SELECT * FROM venue_locations_master WHERE location_id =?1", nativeQuery = true)
    VenueLocation getLocation(String id);

    @Query(value = "SELECT TOP 1 location_id FROM venue_locations_master ORDER BY location_id DESC", nativeQuery = true)
    String returnLastId();
}
