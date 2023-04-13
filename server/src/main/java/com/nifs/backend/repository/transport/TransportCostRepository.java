package com.nifs.backend.repository.transport;

import com.nifs.backend.model.transport.TransportCost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransportCostRepository extends JpaRepository<TransportCost,String> {

    @Query("select c from TransportCost  c where c.documentNo = ?1")
    TransportCost findByDocumentNoEquals(String documentNo);
}
