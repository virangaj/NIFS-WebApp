package com.nifs.backend.controller.common;


import com.nifs.backend.dto.common.ProjectMasterDTO;
import com.nifs.backend.service.common.IProjectMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/common/project")
public class ProjectMasterController {


    @Autowired
    IProjectMasterService projectMasterService;

    @PostMapping("/add")
    public ResponseEntity<?> addProject(@RequestBody ProjectMasterDTO data, @AuthenticationPrincipal UserDetails userDetails) {

        try {
            String user = userDetails.getUsername();
            return ResponseEntity.ok(projectMasterService.saveProject(data, user));
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }

    }

    @GetMapping()
    public List<ProjectMasterDTO> getAllProjects() {

        return projectMasterService.getAllProjects();

    }

    @PutMapping("/upadte/{id}")
    public boolean updateProject(@RequestBody ProjectMasterDTO data, @PathVariable String id, @AuthenticationPrincipal UserDetails userDetails) {
        String user = userDetails.getUsername();
        return projectMasterService.updateProject(data, id, user);
    }
}
