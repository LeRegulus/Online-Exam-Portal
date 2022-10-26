package com.regulus.examportalbackend.services;

import com.regulus.examportalbackend.models.Question;
import com.regulus.examportalbackend.models.Quiz;
import com.regulus.examportalbackend.repositories.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question addQuestion(Question question){
        return this.questionRepository.save(question);
    }
    public Question updateQuestion(Question question, long id){
        Question question1 = questionRepository.findById(id).get();
        question1.setContent(question.getContent());
        question1.setImage(question.getImage());
        question1.setAnswer(question.getAnswer());
        question1.setOption1(question.getOption1());
        question1.setOption2(question.getOption2());
        question1.setOption3(question.getOption3());
        question1.setOption4(question.getOption4());
        return this.questionRepository.save(question1);
    }
    public List<Question> getQuestions(){
        return this.questionRepository.findAll();
    }
    public Question getQuestion(Long id){
        return this.questionRepository.findById(id).get();
    }
    public List<Question> getQuestionOfQuiz(Quiz quiz){
        return this.questionRepository.findByQuiz(quiz);
    }
    public void deleteQuestion(Long id){
        this.questionRepository.deleteById(id);
    }

    public Question get(long id){
        return this.questionRepository.getOne(id);
    }
}
