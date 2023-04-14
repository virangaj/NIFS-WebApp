package com.nifs.backend.serviceImplementation.sedu;

import com.nifs.backend.constant.EventRepresentativeType;
import com.nifs.backend.dto.sedu.EventRepresentativeDTO;
import com.nifs.backend.dto.sedu.ParticipantsMasterDTO;
import com.nifs.backend.model.sedu.EventRepresentativeMaster;
import com.nifs.backend.model.sedu.ParticipantMaster;
import com.nifs.backend.repository.sedu.ParticipantMasterRepository;
import com.nifs.backend.service.sedu.IParticipantMasterService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class ParticipantMasterService implements IParticipantMasterService {

    @Autowired
    private ParticipantMasterRepository participantMasterRepository;
    private ModelMapper modelMapper;

    //convert to entity
    public ParticipantMaster convertToEntity(ParticipantsMasterDTO data, String user){

        return ParticipantMaster.builder()
                .email(data.getEmail())
                .address(data.getAddress())
                .name(data.getName())
                .nic(data.getNic())
                .participantId(data.getParticipantId())
                .eventId(data.getEventId())
                .institute(data.getInstitute())
                .contactNo(data.getContactNo())
                .createdBy(Integer.valueOf(user))
                .createdOn(new Date())
                .build();
    }


    //convert to DTO
    public ParticipantsMasterDTO convertToDTO(ParticipantMaster data){

        return ParticipantsMasterDTO.builder()
                .email(data.getEmail())
                .address(data.getAddress())
                .name(data.getName())
                .nic(data.getNic())
                .participantId(data.getParticipantId())
                .eventId(data.getEventId())
                .institute(data.getInstitute())
                .contactNo(data.getContactNo())
                .createdBy(data.getCreatedBy())
                .createdOn(data.getCreatedOn())
                .modifiedBy(data.getModifiedBy())
                .modifiedOn(data.getModifiedOn())
                .build();
    }
    @Override
    public boolean addSingleParticipants(ParticipantsMasterDTO data, String user) {

        try{
            ParticipantMaster saved = participantMasterRepository.save(convertToEntity(data, user));
            return true;
        }catch (Exception e){
            log.error(e.toString());
            return false;
        }
    }

    @Override
    public List<ParticipantsMasterDTO> getParticipantsByEventId(String id) {

        List<ParticipantMaster> people = participantMasterRepository.findByEventIdEquals(id);

        List<ParticipantsMasterDTO> list = new ArrayList<>();

        people.forEach(p->{
            list.add(convertToDTO(p));
        });

        return list;


    }
}
