package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.dto.sedu.EventRepresentativeDTO;
import com.nifs.backend.dto.sedu.EventRequestDTO;
import com.nifs.backend.dto.sedu.EventRequestMasterDTO;
import com.nifs.backend.model.sedu.EventRequest;
import com.nifs.backend.repository.sedu.EventRequestRepository;
import com.nifs.backend.service.common.IFundingSourceService;
import com.nifs.backend.service.common.IProjectMasterService;
import com.nifs.backend.service.sedu.IEventRepresentativeService;
import com.nifs.backend.service.sedu.IEventRequestService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class EventRequestService implements IEventRequestService {

    @Autowired
    private EventRequestRepository eventRequestRepository;
    @Autowired
    private IEventRepresentativeService eventRepresentativeService;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IFundingSourceService fundingSourceService;
    @Autowired
    private IProjectMasterService projectMasterService;


    // save new events
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

//convert entity class to dto class
    public EventRequestMasterDTO convertToDTO(EventRequest data) {

        return EventRequestMasterDTO.builder()
                .documentNo(data.getDocumentNo())
                .startDate(data.getStartDate())
                .startTime(data.getStartTime())
                .EndDate(data.getEndDate())
                .EndTime(data.getEndTime())
                .title(data.getTitle())
                .remark(data.getRemark())
                .locationId(data.getLocationId().getLocationName())
                .venueId(data.getVenueId().getVenueName())
                .fundingId(fundingSourceService.getFundingById(data.getFundingId()).getName())
                .projectId(projectMasterService.getProjectById(data.getProjectId()).getProjectName())
                .eventType(data.getEventType())
                .noParticipants(data.getNoParticipants())
                .budget(data.getBudget())
                .createdBy(data.getCreatedBy())
                .createdOn(data.getCreatedOn())
                .modifiedBy(data.getModifiedBy())
                .modifiedOn(data.getModifiedOn())
                .build();
    }


    // get all events
    @Override
    public Object getAllEvents() {
        List<EventRequest> allEvents = eventRequestRepository.findAll();
        List<EventRequestMasterDTO> dtoList = new ArrayList<>();
        allEvents.forEach(events -> {
            dtoList.add(convertToDTO(events));
        });
        return dtoList;
    }

    @Override
    public Object getEventById(String id) {
        EventRequest getEvent = eventRequestRepository.findByDocumentNoEquals(id);
        EventRequestMasterDTO dto = convertToDTO(getEvent);

        List<EventRepresentativeDTO> requestMasterDTOList = eventRepresentativeService.getRepresentativeByEventId(id);

        return EventRequestDTO.builder().eventData(dto).representativeList(requestMasterDTOList).build();

    }
}
