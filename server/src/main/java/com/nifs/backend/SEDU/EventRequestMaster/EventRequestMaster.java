package com.nifs.backend.SEDU.EventRequestMaster;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "event_request_master")
public class EventRequestMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "event_id", nullable = false, length = 100)
    private String eventId;

    @Column(name = "event_type", nullable = false, length = 100)
    private String eventType;

    @Column(name = "type", nullable = false, length = 100)
    private String type;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "remark", nullable = false, length = 255)
    private String remarks;

    @Column(name = "start_date", nullable = false)
    private String startDate;

    @Column(name = "end_date", nullable = false)
    private String endDate;

    @Column(name = "start_time", nullable = false)
    private String startTime;

    @Column(name = "end_time", nullable = false)
    private String endTime;

    @Column(name = "no_participants", nullable = false)
    private int noParticipants;

    @Column(name = "budget", nullable = false)
    private double budget;

    //    private String project;
    @Column(name = "vote", nullable = false)
    private String vote;

    @Column(name = "location", nullable = false, length = 255)
    private String location;

    @Column(name = "venue_name", nullable = false, length = 255)
    private String venueName;

    @Column(name = "venue_type", nullable = false, length = 100)
    private String venueType;

    @Column(name = "fund_type", nullable = false, length = 255)
    private String fundType;


    @Column(name = "attachment", length = 1000)
    @Lob
    private byte[] attachment;


//    relationships




}
