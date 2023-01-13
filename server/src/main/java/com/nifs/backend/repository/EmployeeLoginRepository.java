package com.nifs.backend.repository;

import com.nifs.backend.model.EmployeeLogin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeLoginRepository extends JpaRepository<EmployeeLogin, Integer> {
}
