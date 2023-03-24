package com.nifs.backend.repository;

import com.nifs.backend.model.EmployeeMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleMasterRepository extends JpaRepository<EmployeeMaster,String> {
}
