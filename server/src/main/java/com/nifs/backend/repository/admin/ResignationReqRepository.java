package com.nifs.backend.repository.admin;


import com.nifs.backend.model.admin.ResignationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResignationReqRepository extends JpaRepository<ResignationRequest, String> {
}
