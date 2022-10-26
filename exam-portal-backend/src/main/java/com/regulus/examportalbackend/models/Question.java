package com.regulus.examportalbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questId;

    @Column(length = 5000)
    private String content;

    private String image;

    private String option1;

    private String option2;

    private String option3;

    private String option4;

    @JsonIgnore
    private String answer;

    @Transient
    private String givenAnswer;

    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;
}
