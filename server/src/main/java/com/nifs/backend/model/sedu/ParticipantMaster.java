package com.nifs.backend.model.sedu;


import com.nifs.backend.model.Base;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@Table(name="participant_master")
public class ParticipantMaster extends Base {
    private String participantId;
    private String eventId;
    private String name;
    private String nic;
    private String gender;
    private String contactNo;
    private String address;
    private String email;
    private String institute;
}
