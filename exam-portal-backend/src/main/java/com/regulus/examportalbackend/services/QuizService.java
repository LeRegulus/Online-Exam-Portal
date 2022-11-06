package com.regulus.examportalbackend.services;

import com.regulus.examportalbackend.models.Category;
import com.regulus.examportalbackend.models.Quiz;
import com.regulus.examportalbackend.repositories.QuizRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class QuizService {

    private final QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public Quiz addQuiz(Quiz quiz){
        return this.quizRepository.save(quiz);
    }
    public Quiz updateQuiz(Quiz quiz, long id){
        Quiz quiz1 = quizRepository.findById(id).get();
        quiz1.setTitle(quiz.getTitle());
        quiz1.setDescription(quiz.getDescription());
        quiz1.setMaxMarks(quiz.getMaxMarks());
        quiz1.setNumberOfQuestions(quiz.getNumberOfQuestions());
        quiz1.setCategory(quiz.getCategory());
        quiz1.setActive(quiz.isActive());
        return this.quizRepository.save(quiz1);
    }
    public List<Quiz> getQuizzes(){
        return this.quizRepository.findAll();
    }
    public Quiz getQuiz(Long id){
        return this.quizRepository.findById(id).get();
    }
    public void deleteQuiz(Long id){
        quizRepository.deleteById(id);
    }

    public List<Quiz> getQuizzesOfCategory(Category category) {
        return this.quizRepository.findByCategory(category);
    }

    public List<Quiz> getActivesQuizzes() {
        return this.quizRepository.findByActive(true);
    }

    public List<Quiz> getActivesQuizzesOfCategory(Category category) {
        return this.quizRepository.findByCategoryAndActive(category, true);
    }


}
