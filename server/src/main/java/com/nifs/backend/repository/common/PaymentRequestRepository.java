package com.nifs.backend.repository.common;

import com.nifs.backend.model.common.PaymentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PaymentRequestRepository extends JpaRepository<PaymentRequest,String> {

    @Query("select c from PaymentRequest c where c.documentNo = ?1")
    PaymentRequest findByDocumentNoEquals(String documentNo);
}
