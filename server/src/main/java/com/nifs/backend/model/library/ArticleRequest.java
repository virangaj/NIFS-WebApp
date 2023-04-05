package com.nifs.backend.model.library;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nifs.backend.model.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.format.annotation.DateTimeFormat;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@Table(name = "article_request")
@Entity
public class ArticleRequest extends Base {

    private String documentNo;

    @Column(name = "employee")
    private String employee;

    @Column(name = "designation")
    private String designation;

    @Column(name = "division")
    private String division;

    @Column(name = "head_of_library")
    private String headOfLibrary;

    @Column(name = "name_of_journal")
    private String nameOfJournal;

    @Column(name = "year")
    private String year;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;

    @Column(name = "volume")
    private String volume;

    @Column(name = "issue")
    private String issue;

    @Column(name = "pages")
    private String pages;

    @Column(name = "weblink")
    private String webLink;

    @Column(name = "attachment")
    private String attachment;

    @Column(name = "remarks")
    private String remarks;
}
