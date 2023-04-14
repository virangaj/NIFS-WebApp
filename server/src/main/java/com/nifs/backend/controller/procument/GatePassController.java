package com.nifs.backend.controller.procument;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.dto.procument.GatePassDTO;
import com.nifs.backend.serviceImplementation.procument.GatePassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/procument/gate-pass")
public class GatePassController {

    final
    GatePassService gatePassService;

    final
    JwtService jwtService;

    public GatePassController(GatePassService gatePassService, JwtService jwtService) {
        this.gatePassService = gatePassService;
        this.jwtService = jwtService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewGatePassRequest(@RequestBody GatePassDTO data){
        return ResponseEntity.ok(gatePassService.createNewArticleRequest(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllGatePassRequests(@RequestParam(required = false) String division){
        return ResponseEntity.ok(gatePassService.getAllArticleRequests(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(gatePassService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(gatePassService.putDirectorApproval(approval, resId, user));
    }


}
