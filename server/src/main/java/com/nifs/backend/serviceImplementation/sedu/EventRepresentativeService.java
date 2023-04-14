package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.repository.sedu.EventRepresentativeRepository;
import com.nifs.backend.service.sedu.IEventRepresentativeService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Log4j2
public class EventRepresentativeService implements IEventRepresentativeService {

    @Autowired
    private EventRepresentativeRepository representativeRepository;
    @Autowired
    private ModelMapper modelMapper;
}
