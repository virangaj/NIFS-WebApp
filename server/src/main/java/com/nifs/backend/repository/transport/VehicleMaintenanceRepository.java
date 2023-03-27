package com.nifs.backend.repository.transport;

import com.nifs.backend.model.transport.VehicleMaintenance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VehicleMaintenanceRepository  extends JpaRepository<VehicleMaintenance,String> {

    @Query("select c from VehicleMaintenance c where c.documentNo= ?1")
    VehicleMaintenance findByDocumentNoEquals(String documentNo);


}
