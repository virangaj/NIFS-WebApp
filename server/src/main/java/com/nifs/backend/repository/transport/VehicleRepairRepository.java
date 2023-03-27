package com.nifs.backend.repository.transport;

import com.nifs.backend.model.transport.VehicleRepair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VehicleRepairRepository extends JpaRepository<VehicleRepair,String> {

    @Query("select c from VehicleRepair  c where c.documentNo = ?1")
    VehicleRepair findByDocumentNoEquals(String documentNo);
}
