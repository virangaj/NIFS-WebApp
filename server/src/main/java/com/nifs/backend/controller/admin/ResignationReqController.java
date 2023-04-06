package com.nifs.backend.controller.admin;


import com.nifs.backend.dto.admin.ResignationRequestDTO;
import com.nifs.backend.service.admin.IResignationReqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/resignation")
public class ResignationReqController {

    @Autowired
    private IResignationReqService resignationReqService;

    @PostMapping
    public ResponseEntity<?> createResignationRequest(@RequestBody ResignationRequestDTO data){

        return ResponseEntity.ok(resignationReqService.createResignationRequest(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllResignationRequests(){

        return ResponseEntity.ok(resignationReqService.getAllResignationRequests());
    }
}
