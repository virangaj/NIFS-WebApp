package com.nifs.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EmpCatDTO {
    private String empCatId;
    private String description;
    private String otRate;
    private String location;


}
