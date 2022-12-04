package com.nifs.backend.SEDU.VenueMaster;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VenueMasterRepository extends JpaRepository<VenueMaster, Integer> {

    @Query(value="SELECT * FROM venuemaster", nativeQuery = true)
    List<VenueMaster> returnAll();
}
