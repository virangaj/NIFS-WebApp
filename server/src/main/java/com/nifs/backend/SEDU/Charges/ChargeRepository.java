package com.nifs.backend.SEDU.Charges;

import com.nifs.backend.SEDU.Facility.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ChargeRepository extends JpaRepository<Charges, String> {

    @Query(value="SELECT * FROM venue_charges_master WHERE charge_id =?1", nativeQuery = true)
    Charges returnCharge(String id);

//    @Query(value = "SELECT charge_id FROM venue_charges_master ORDER BY charge_id DESC LIMIT 1", nativeQuery = true)
    @Query(value = "SELECT TOP 1 charge_id FROM venue_charges_master ORDER BY charge_id DESC", nativeQuery = true)
    String returnLastId();
}
