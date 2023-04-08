package com.nifs.backend.repository.transport;

import com.nifs.backend.model.transport.RepairRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RepairRequestRepository extends JpaRepository<RepairRequest,String> {

    @Query("select c from RepairRequest  c where c.documentNo = ?1")
    RepairRequest findByDocumentNoEquals(String documentNo);

}
