package com.nifs.backend.service.sedu;

import com.nifs.backend.dto.sedu.EventRepresentativeDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IEventRepresentativeService {
    boolean saveRepresentativeData(String documentNo, List<EventRepresentativeDTO> representativeList, String user);
}
