package com.nifs.backend.repository.transport;

import com.nifs.backend.model.transport.MaintenanceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest,String> {


    @Query("select c from MaintenanceRequest c where c.documentNo = ?1")
    MaintenanceRequest findByDocumentNoEquals(String documentNo);
}
