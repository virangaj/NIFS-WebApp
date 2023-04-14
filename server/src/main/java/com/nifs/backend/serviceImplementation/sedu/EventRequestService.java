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

import java.util.Date;

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
    public String createNewEventRequest(EventRequestDTO eventData, String user) {
        try{
            EventRequest eventRequest = modelMapper.map(eventData.getEventData(), EventRequest.class);
            eventRequest.setCreatedOn(new Date());
            eventRequest.setCreatedBy(Integer.valueOf(user));
            EventRequest savedReq = eventRequestRepository.save(eventRequest);

            //save event representative list
            boolean b = eventRepresentativeService.saveRepresentativeData(savedReq.getDocumentNo(), eventData.getRepresentativeList(), user);

            if(b && savedReq.getId() >= 0 ){
                return "Events and Participants are added!";
            }else if(!b && savedReq.getId() >= 0){
                return "Events and added, but error on adding Participants";

            }else{
                return "Request cannot be completed!";

            }

        }catch(Exception e){
            log.error(e.toString());
            return e.toString();
        }
    }
}
