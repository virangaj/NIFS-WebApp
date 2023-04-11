package com.nifs.backend.model.common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nifs.backend.model.Base;
import com.nifs.backend.model.admin.Locations;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Table(name = "project_master")
public class ProjectMaster extends Base {


    private String projectId;
    private String projectName;
    private String description;
    private String remark;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    private Locations locationId;


}
