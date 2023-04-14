package com.nifs.backend.model.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.model.Base;
import com.nifs.backend.model.admin.Locations;
import com.nifs.backend.model.sedu.EventRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
@Entity
@Table(name = "funding_sources")
public class FundingSources extends Base {
    @Column(name = "funding_id", nullable = false, length = 10)
    private String fundingId;
    private String name;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    @JsonIgnoreProperties("fundingSources")
    private Locations locationId;

    @JsonIgnore
    @OneToMany(mappedBy = "fundingId", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<EventRequest> eventRequests;
}
