package com.regulus.examportalbackend.controllers;

import com.regulus.examportalbackend.models.Question;
import com.regulus.examportalbackend.models.Quiz;
import com.regulus.examportalbackend.services.QuestionService;
import com.regulus.examportalbackend.services.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/exam-portal/question")
public class QuestionController {

    private final QuestionService questionService;

    private final QuizService quizService;

    public QuestionController(QuestionService questionService, QuizService quizService) {
        this.questionService = questionService;
        this.quizService = quizService;
    }

    @PostMapping("/")
    public ResponseEntity<?> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    @GetMapping("/{id}")
    public Question getQuestion(@PathVariable("id") long id){
        return this.questionService.getQuestion(id);
    }

    @GetMapping("/")
    public ResponseEntity<?> getQuestions(){
        return ResponseEntity.ok(this.questionService.getQuestions());
    }

    @PutMapping("/{id}")
    public Question updateQuestion(@PathVariable("id") long id, @RequestBody Question question){
        return this.questionService.updateQuestion(question, id);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable("id") long id){
        this.questionService.deleteQuestion(id);
    }

    @GetMapping("/quiz/{idQuiz}")
    public ResponseEntity<?> getQuestionOfQuiz(@PathVariable("idQuiz") long idQuiz){
        Quiz quiz = this.quizService.getQuiz(idQuiz);
        List<Question> questions = quiz.getQuestions();
        if(questions.size() > quiz.getNumberOfQuestions()){
            questions = questions.subList(0, quiz.getNumberOfQuestions() + 1);
        }
        Collections.shuffle(questions);
        return ResponseEntity.ok(questions);
    }

    //eval Quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        System.out.println(questions);
        double marksGot = 0;
        int correctAnswers = 0;
        int attemptes = 0;
        for (Question q : questions) {
            Question question = this.questionService.get(q.getQuestId());
            if (question.getAnswer().equals(q.getGivenAnswer())){
                correctAnswers++;
                double markSingle = questions.get(0).getQuiz().getMaxMarks()/questions.size();
                marksGot += markSingle;
            }
            if (q.getGivenAnswer() != null){
                attemptes++;
            }
        };
        Map<String, Object> map = Map.of("marksGot", marksGot,"correctAnswer", correctAnswers, "attemptes", attemptes);
        return ResponseEntity.ok(map);
    }

}
