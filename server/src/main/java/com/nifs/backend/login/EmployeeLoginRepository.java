package com.nifs.backend.login;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeLoginRepository extends JpaRepository<EmployeeLogin, Integer> {
}
