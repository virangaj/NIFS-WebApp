package com.nifs.backend.repository.admin;


import com.nifs.backend.model.admin.ResignationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface ResignationReqRepository extends JpaRepository<ResignationRequest, String> {

    List<ResignationRequest> findByDivisionIdOrderByCreatedOnDesc(String divisionId);
    List<ResignationRequest> findAllByOrderByCreatedOnDesc();

    @Transactional
    @Modifying
    @Query("UPDATE ResignationRequest r SET r.hodApprove = :hodApprove, r.modifiedBy = :modifiedBy, r.modifiedOn = :modifiedOn WHERE r.documentNo = :documentNo")
    void updateHodApproveAndModifiedFields(@Param("hodApprove") boolean hodApprove, @Param("modifiedBy") String modifiedBy, @Param("modifiedOn") Date modifiedOn, @Param("documentNo") String documentNo);


    @Transactional
    @Modifying
    @Query("UPDATE ResignationRequest r SET r.dirApproved = :dirApproved, r.modifiedBy = :modifiedBy, r.modifiedOn = :modifiedOn WHERE r.documentNo = :documentNo")
    void updateDirApproveAndModifiedFields(@Param("dirApproved") boolean dirApproved, @Param("modifiedBy") String modifiedBy, @Param("modifiedOn") Date modifiedOn, @Param("documentNo") String documentNo);



}
