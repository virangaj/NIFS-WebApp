package com.nifs.backend.controller.admin;


import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.service.admin.IResignationReqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/resignation")
public class ResignationReqController {

    @Autowired
    private IResignationReqService resignationReqService;

    @PostMapping
    public ResponseEntity<?> createResignationRequest(@RequestBody ResignationRequestDTO data){

        return ResponseEntity.ok(resignationReqService.createResignationRequest(data));
    }
}
