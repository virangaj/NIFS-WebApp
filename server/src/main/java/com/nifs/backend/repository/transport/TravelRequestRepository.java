package com.nifs.backend.repository.transport;

import com.nifs.backend.model.transport.TravelRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TravelRequestRepository extends JpaRepository<TravelRequest,String> {


    @Query("select c from TravelRequest c where c.documentNo = ?1")
    TravelRequest findByDocumentNoEquals(String documentNo);

}
