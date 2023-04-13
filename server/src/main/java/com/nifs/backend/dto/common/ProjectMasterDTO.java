package com.nifs.backend.dto.common;

import com.nifs.backend.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class ProjectMasterDTO extends BaseDTO {
    private String projectId;
    private String description;

    private String projectName;
    private String locationId;
    private String remark;


}
