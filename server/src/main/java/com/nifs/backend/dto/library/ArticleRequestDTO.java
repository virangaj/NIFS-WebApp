package com.nifs.backend.dto.library;

import com.nifs.backend.dto.BaseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
public class ArticleRequestDTO extends BaseDTO {

    private String documentNo;
    private String employee;
    private String designation;
    private String division;
    private String headOfLibrary;
    private String nameOfJournal;
    private String year;
    private String date;
    private String volume;
    private String issue;
    private String pages;
    private String webLink;
    private String attachment;
    private String remarks;
}
