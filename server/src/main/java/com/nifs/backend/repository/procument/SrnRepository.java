package com.nifs.backend.repository.procument;

import com.nifs.backend.model.procument.Srn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SrnRepository extends JpaRepository<Srn,String> {

    @Query("select c from Srn c where c.documentNo = ?1")
    Srn findByDocumentNoEquals(String documentNo);
}
