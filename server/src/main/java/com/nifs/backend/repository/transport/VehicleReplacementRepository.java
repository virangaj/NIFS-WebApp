package com.nifs.backend.repository.transport;

import com.nifs.backend.model.transport.VehicleReplacement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VehicleReplacementRepository extends JpaRepository<VehicleReplacement,String> {

    @Query("select c from  VehicleReplacement c where c.documentNo = ?1")
    VehicleReplacement findByDocumentNoEquals(String documentNo);

}

