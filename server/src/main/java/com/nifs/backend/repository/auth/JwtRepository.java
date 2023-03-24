package com.nifs.backend.repository.auth;

import com.nifs.backend.model.JwtTokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface JwtRepository extends JpaRepository<JwtTokens, String> {
    @Transactional
    @Modifying
    @Query("delete from JwtTokens j where j.epfNo = ?1")
    void deleteToken(int epfNo);
    JwtTokens findByIdEquals(String id);



    @Query("select j from JwtTokens j where j.epfNo = ?1")
    JwtTokens findByEpfNo(int epfNo);
}
