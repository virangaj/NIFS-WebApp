package com.nifs.backend.service.common;

import com.nifs.backend.dto.common.ProjectMasterDTO;
import com.nifs.backend.model.common.ProjectMaster;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IProjectMasterService {


    boolean saveProject(ProjectMasterDTO data, String user);

    List<ProjectMasterDTO> getAllProjects();

    boolean updateProject(ProjectMasterDTO data, String id, String user);

    ProjectMaster getProjectById(String projectId);
}
