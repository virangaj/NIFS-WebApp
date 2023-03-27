package com.nifs.backend.repository.transport;

import com.nifs.backend.model.transport.VehicleMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface VehicleMasterRepository extends JpaRepository<VehicleMaster,String> {

    @Query("select c from VehicleMaster  c where  c.registrationNo =?1")
    VehicleMaster findByRegistrationNoEquals(String registrationNo);
}
