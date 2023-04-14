package com.nifs.backend.repository.library;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.model.library.ArticleRequest;
import com.nifs.backend.model.transport.TravelRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface ArticleRequestRepository extends JpaRepository<ArticleRequest,String> {


    @Query("select c from ArticleRequest c where c.documentNo = ?1")
    ArticleRequest findByDocumentNoEquals(String documentNo);

    List<ArticleRequest> findByDivisionIdOrderByCreatedOnDesc(String divisionId);


    List<ArticleRequest> findAllByOrderByCreatedOnDesc();

    @Transactional
    @Modifying
    @Query("UPDATE ArticleRequest r SET r.hodApproved = :hodApproved, r.modifiedBy = :modifiedBy, r.modifiedOn = :modifiedOn WHERE r.documentNo = :documentNo")
    void updateHodApproveAndModifiedFields(@Param("hodApproved") RequestStatus hodApprove, @Param("modifiedBy") String modifiedBy, @Param("modifiedOn") Date modifiedOn, @Param("documentNo") String documentNo);


    @Transactional
    @Modifying
    @Query("UPDATE ArticleRequest r SET r.dirApproved = :dirApproved, r.modifiedBy = :modifiedBy, r.modifiedOn = :modifiedOn WHERE r.documentNo = :documentNo")
    void updateDirApproveAndModifiedFields(@Param("dirApproved") RequestStatus dirApproved, @Param("modifiedBy") String modifiedBy, @Param("modifiedOn") Date modifiedOn, @Param("documentNo") String documentNo);


}
