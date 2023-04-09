package com.nifs.backend.repository.common;

import com.nifs.backend.model.common.OverTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OverTimeRepository  extends JpaRepository<OverTime,String> {


    @Query("select c from OverTime c where c.documentNo = ?1")
    OverTime findByDocumentNoEquals(String documentNo);
}
