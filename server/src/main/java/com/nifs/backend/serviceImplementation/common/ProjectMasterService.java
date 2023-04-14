package com.nifs.backend.serviceImplementation.common;

import com.nifs.backend.dto.common.ProjectMasterDTO;
import com.nifs.backend.model.common.ProjectMaster;
import com.nifs.backend.repository.common.ProjectMasterRepository;
import com.nifs.backend.service.common.IProjectMasterService;
import com.nifs.backend.serviceImplementation.admin.LocationService;
import com.nifs.backend.util.NewIdGenerator;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Log4j2
public class ProjectMasterService implements IProjectMasterService {


    @Autowired
    ProjectMasterRepository projectMasterRepository;
    @Autowired
    LocationService locationService;
    @Autowired
    private ModelMapper modelMapper;


    //create a ner project
    @Override
    public boolean saveProject(ProjectMasterDTO data, String user) {
        try {
            ProjectMaster project = modelMapper.map(data, ProjectMaster.class);
            project.setCreatedBy(Integer.valueOf(user));
            project.setCreatedOn(new Date());
            project.setLocationId(locationService.getLocationById(data.getLocationId()));
            String lastId = projectMasterRepository.returnLastId();
            if (lastId == null) {
                project.setProjectId("PM1001");
            }
            else {
                project.setProjectId(NewIdGenerator.newIDGenerator(lastId));
            }

            ProjectMaster saved = projectMasterRepository.save(project);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    // get  all projects
    @Override
    public List<ProjectMasterDTO> getAllProjects() {
        List<ProjectMaster> projects = projectMasterRepository.findAll();

        List<ProjectMasterDTO> projectMasterDTOS = new ArrayList<>();
        projects.forEach(p -> {
            projectMasterDTOS.add(createProjectDTO(p));
        });
        return projectMasterDTOS;
    }

    //update all projects
    @Override
    public boolean updateProject(ProjectMasterDTO data, String id, String user) {
        if (projectMasterRepository.findByProjectIdEquals(id) != null) {

            try {
                log.info("Project update query start");
                projectMasterRepository.updateProject(data.getProjectName(), data.getDescription(), new Date(), Integer.valueOf(user), id);
                return true;

            } catch (Exception e) {
                log.info(e.toString());
                return false;
            }
        }
        else {
            return false;
        }

    }

    @Override
    public ProjectMaster getProjectById(String projectId) {
        return projectMasterRepository.findByProjectIdEquals(projectId);
    }


    //convert in to dto
    public ProjectMasterDTO createProjectDTO(ProjectMaster p) {

        return ProjectMasterDTO.builder()
                .id(p.getId())
                .projectId(p.getProjectId())
                .projectName(p.getProjectName())
                .description(p.getDescription())
                .remark(p.getRemark())
                .locationId(p.getLocationId().getLocationId())
                .createdOn(p.getCreatedOn())
                .createdBy(p.getCreatedBy())
                .build();

    }
}
