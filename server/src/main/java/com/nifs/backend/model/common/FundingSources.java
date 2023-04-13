package com.nifs.backend.model.common;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.model.Base;
import com.nifs.backend.model.admin.Locations;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
@Entity
@Table(name = "funding_sources")
public class FundingSources extends Base {

    private String fundingId;
    private String name;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    @JsonIgnoreProperties("fundingSources")
    private Locations locationId;
}
