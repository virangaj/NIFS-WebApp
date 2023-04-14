package com.nifs.backend.service.sedu;

import com.nifs.backend.dto.sedu.EventRequestDTO;
import org.springframework.stereotype.Service;

@Service
public interface IEventRequestService {
    boolean createNewEventRequest(EventRequestDTO eventData, String user);
}
