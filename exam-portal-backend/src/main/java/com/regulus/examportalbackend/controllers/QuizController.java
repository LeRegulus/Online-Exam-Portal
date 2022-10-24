package com.regulus.examportalbackend.controllers;

import com.regulus.examportalbackend.models.Quiz;
import com.regulus.examportalbackend.services.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/exam-portal/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/")
    public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz){
        Quiz quiz1 = this.quizService.addQuiz(quiz);
        return ResponseEntity.ok(quiz1);
    }

    @GetMapping("/{id}")
    public Quiz getQuiz(@PathVariable("id") long id){
        return this.quizService.getQuiz(id);
    }

    @GetMapping("/")
    public ResponseEntity<?> getQuizzes(){
        return ResponseEntity.ok(this.quizService.getQuizzes());
    }

    @PutMapping("/{id}")
    public Quiz updateQuiz(@PathVariable("id") long id, @RequestBody Quiz quiz){
        return this.quizService.updateQuiz(quiz, id);
    }

    @DeleteMapping("/{id}")
    public void deleteQuiz(@PathVariable("id") long id){
        this.quizService.deleteQuiz(id);
    }

}
