package com.nifs.backend.service.common;

import com.nifs.backend.dto.common.OvertimeDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface IOverTimeService {

    ResponseEntity<?> createNewOverTime(OvertimeDTO data);
}
