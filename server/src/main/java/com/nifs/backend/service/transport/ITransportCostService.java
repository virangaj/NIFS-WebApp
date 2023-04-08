package com.nifs.backend.service.transport;

import com.nifs.backend.dto.transport.TransportCostDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface ITransportCostService {

    ResponseEntity<?> createNewTransportCost(TransportCostDTO data);
}
