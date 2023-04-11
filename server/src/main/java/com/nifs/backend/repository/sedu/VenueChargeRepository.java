package com.nifs.backend.repository.sedu;

import com.nifs.backend.model.sedu.VenueCharge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface VenueChargeRepository extends JpaRepository<VenueCharge, Integer> {
    List<VenueCharge> findByVenueMasterId_VenueIdEquals(String venueId);



}