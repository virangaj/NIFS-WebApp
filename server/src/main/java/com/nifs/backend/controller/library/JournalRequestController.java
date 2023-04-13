package com.nifs.backend.controller.library;

import com.nifs.backend.dto.library.JournalRequestDTO;
import com.nifs.backend.serviceImplementation.library.JournalRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/library/journal-request")
public class JournalRequestController {

    final
    JournalRequestService journalRequestService;

    public JournalRequestController(JournalRequestService journalRequestService) {
        this.journalRequestService = journalRequestService;
    }

    @GetMapping
    public ResponseEntity<?> getAllJournalRequest(){
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewJournalRequest(@RequestBody JournalRequestDTO data){
        return journalRequestService.createNewJournalRequest(data);

    }
}
