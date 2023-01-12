package com.nifs.backend.admin.OtherData.repository;

import com.nifs.backend.admin.OtherData.entity.Religions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReligionRepository extends JpaRepository<Religions, Integer> {
    @Query("select r from Religions r where r.name = ?1 order by r.id, r.name")
    Optional<Religions> findByName(String name);
}
