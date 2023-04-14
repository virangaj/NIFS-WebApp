package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.dto.sedu.EventRepresentativeDTO;
import com.nifs.backend.model.sedu.EventRepresentativeMaster;
import com.nifs.backend.repository.sedu.EventRepresentativeRepository;
import com.nifs.backend.service.sedu.IEventRepresentativeService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class EventRepresentativeService implements IEventRepresentativeService {

    @Autowired
    private EventRepresentativeRepository representativeRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean saveRepresentativeData(String documentNo, List<EventRepresentativeDTO> representativeList, String user) {

        try{
            List<EventRepresentativeMaster> people = new ArrayList<>();
            representativeList.forEach(r -> {
                EventRepresentativeMaster single = modelMapper.map(r, EventRepresentativeMaster.class);
                single.setEventId(documentNo);
                single.setCreatedOn(new Date());
                single.setCreatedBy(Integer.valueOf(user));
                people.add(single);
            });

            representativeRepository.saveAll(people);
            log.info("--------All people saved");
            return true;
        }catch (Exception e){
            log.info(e.toString());
            return false;
        }
    }
}
