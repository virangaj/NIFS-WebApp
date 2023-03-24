package com.nifs.backend.repository.admin;

import com.nifs.backend.model.admin.ContractExtension;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ContractExRepository extends JpaRepository<ContractExtension, Integer> {
    @Query("select c from ContractExtension c where c.documentNo = ?1")
    ContractExtension findByDocumentNoEquals(String documentNo);
}
