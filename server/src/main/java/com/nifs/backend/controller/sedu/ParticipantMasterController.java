package com.nifs.backend.controller.sedu;

import com.nifs.backend.dto.sedu.BulkParticipantsDTO;
import com.nifs.backend.dto.sedu.ParticipantsMasterDTO;
import com.nifs.backend.service.sedu.IParticipantMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sedu/participants")
public class ParticipantMasterController {

    @Autowired
    private IParticipantMasterService participantMasterService;

//    works for only single reqiest
    @PostMapping("/add-single")
    public boolean addSingleParticipants(@RequestBody ParticipantsMasterDTO data, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();

        return participantMasterService.addSingleParticipants(data, user);
    }

    @PostMapping("/add-bulk")
    public boolean addBulkParticipants(@RequestBody BulkParticipantsDTO data, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();

        return participantMasterService.addBulkOfParticipants(data, user);
    }

}
