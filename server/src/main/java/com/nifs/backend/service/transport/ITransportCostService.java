package com.nifs.backend.service.transport;

import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.transport.TransportCostDTO;
import com.nifs.backend.dto.transport.TravelRequestDTO;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ITransportCostService {

    TransportCostDTO createNewTransportCost(TransportCostDTO data) throws MessagingException;


    List<TransportCostDTO> getAllTravelRequests(String division);

    boolean putHodApproval(RequestStatus approval, List<String> resId, String user);

    Object putDirectorApproval(RequestStatus approval, List<String> resId, String user);





}
