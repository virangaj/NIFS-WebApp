package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.dto.sedu.EventRequestDTO;
import com.nifs.backend.model.sedu.EventRequest;
import com.nifs.backend.repository.sedu.EventRequestRepository;
import com.nifs.backend.service.sedu.IEventRepresentativeService;
import com.nifs.backend.service.sedu.IEventRequestService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class EventRequestService implements IEventRequestService {

    @Autowired
    private EventRequestRepository eventRequestRepository;
    @Autowired
    private IEventRepresentativeService eventRepresentativeService;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public boolean createNewEventRequest(EventRequestDTO eventData, String user) {
        EventRequest eventRequest = modelMapper.map(eventData, EventRequest.class);
        return false;
    }
}
