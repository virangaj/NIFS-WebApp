package com.nifs.backend.repository.procument;


import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.model.library.ArticleRequest;
import com.nifs.backend.model.procument.GatePass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface GatePassRepository extends JpaRepository<GatePass,String> {

    @Query("select c from GatePass c where c.documentNo = ?1")
    GatePass findByDocumentNoEquals(String documentNo);

    List<GatePass> findByDivisionIdOrderByCreatedOnDesc(String divisionId);


    List<GatePass> findAllByOrderByCreatedOnDesc();

    @Transactional
    @Modifying
    @Query("UPDATE GatePass r SET r.hodApproved = :hodApproved, r.modifiedBy = :modifiedBy, r.modifiedOn = :modifiedOn WHERE r.documentNo = :documentNo")
    void updateHodApproveAndModifiedFields(@Param("hodApproved") RequestStatus hodApprove, @Param("modifiedBy") String modifiedBy, @Param("modifiedOn") Date modifiedOn, @Param("documentNo") String documentNo);


    @Transactional
    @Modifying
    @Query("UPDATE GatePass r SET r.dirApproved = :dirApproved, r.modifiedBy = :modifiedBy, r.modifiedOn = :modifiedOn WHERE r.documentNo = :documentNo")
    void updateDirApproveAndModifiedFields(@Param("dirApproved") RequestStatus dirApproved, @Param("modifiedBy") String modifiedBy, @Param("modifiedOn") Date modifiedOn, @Param("documentNo") String documentNo);


}
