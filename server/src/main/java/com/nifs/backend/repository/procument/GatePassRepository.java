package com.nifs.backend.repository.procument;


import com.nifs.backend.model.procument.GatePass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GatePassRepository extends JpaRepository<GatePass,String> {

    @Query("select c from GatePass c where c.documentNo = ?1")
    GatePass findByDocumentNoEquals(String documentNo);

}
