package com.nifs.backend.repository.sedu;


import com.nifs.backend.model.sedu.VenueFacility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface VenueFacilityRepository extends JpaRepository<VenueFacility, Integer> {
    List<VenueFacility> findByVenueMasterId_VenueIdEquals(String venueId);

}