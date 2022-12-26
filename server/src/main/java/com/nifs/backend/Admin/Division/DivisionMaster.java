package com.nifs.backend.Admin.Division;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nifs.backend.Admin.EmployeeMaster.EmployeeMaster;
import com.nifs.backend.Admin.Locations.Locations;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="division_master")
public class DivisionMaster {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
//    private int id;
    @Id
    @Column(name = "division_id", nullable = false, length = 50)
    private String divisionId;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "updated_date")
    private Date updatedDate;

    //relationship
    //location
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE})
    @JoinColumn(name = "location_id", referencedColumnName = "location_id", nullable = false)
    @JsonIgnoreProperties("divisions")
    private Locations location;


    //employee
    @OneToMany(mappedBy = "division", cascade = {CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonIgnoreProperties("division")
    private List<EmployeeMaster> employee;

//    constructor for create new instance
    public DivisionMaster(String divisionId, String name, Date createdDate, Locations location) {
        this.divisionId = divisionId;
        this.name = name;
        this.createdDate = createdDate;
        this.location = location;
    }
}
