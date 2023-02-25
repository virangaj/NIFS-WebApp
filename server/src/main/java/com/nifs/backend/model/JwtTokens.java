package com.nifs.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Table(name = "jwt_tokens")
public class JwtTokens {

    @Id
    @Column(name = "id", nullable = false)
    private String id;

    private int epfNo;
    private String token;
    private Date date_created;

}
