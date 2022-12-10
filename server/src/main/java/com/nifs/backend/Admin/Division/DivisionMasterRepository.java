package com.nifs.backend.Admin.Division;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DivisionMasterRepository extends JpaRepository<DivisionMaster, String> {

//    @Query(value = "SELECT TOP 1 division_id FROM division_master ORDER BY division_id DESC LIMIT 1", nativeQuery = true)
    @Query(value = "SELECT TOP 1 division_id FROM division_master ORDER BY division_id DESC", nativeQuery = true)
    String returnLastId();


    @Query(value = "SELECT * FROM division_master WHERE division_id =?1",nativeQuery = true)
    DivisionMaster getDivisionById(String id);
}
