package com.nifs.backend.model.sedu;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "project_master")
public class ProjectMaster {

    @Id
    @Column(name = "p_id", nullable = false)
    private String pId;

    @Column(name = "p_name", nullable = false)
    private String projectName;

    @Column(name = "description")
    private String desc;



}
