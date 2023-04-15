package com.nifs.backend.repository.admin;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.model.admin.Accomodation;
import com.nifs.backend.model.transport.TravelRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

public interface AccomodationRepository extends JpaRepository<Accomodation,String> {

    @Query("select c from Accomodation c where c.documentNo = ?1")
    Accomodation findByDocumentNoEquals(String documentNo);

    List<Accomodation> findByDivisionIdOrderByCreatedOnDesc(String divisionId);


    List<Accomodation> findAllByOrderByCreatedOnDesc();

    @Transactional
    @Modifying
    @Query("UPDATE Accomodation r SET r.hodApproved = :hodApproved, r.modifiedBy = :modifiedBy, r.modifiedOn = :modifiedOn WHERE r.documentNo = :documentNo")
    void updateHodApproveAndModifiedFields(@Param("hodApproved") RequestStatus hodApprove, @Param("modifiedBy") String modifiedBy, @Param("modifiedOn") Date modifiedOn, @Param("documentNo") String documentNo);


    @Transactional
    @Modifying
    @Query("UPDATE Accomodation r SET r.dirApproved = :dirApproved, r.modifiedBy = :modifiedBy, r.modifiedOn = :modifiedOn WHERE r.documentNo = :documentNo")
    void updateDirApproveAndModifiedFields(@Param("dirApproved") RequestStatus dirApproved, @Param("modifiedBy") String modifiedBy, @Param("modifiedOn") Date modifiedOn, @Param("documentNo") String documentNo);


}
