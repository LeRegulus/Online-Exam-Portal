package com.regulus.examportalbackend.controllers;

import com.regulus.examportalbackend.models.Question;
import com.regulus.examportalbackend.models.Quiz;
import com.regulus.examportalbackend.models.User;
import com.regulus.examportalbackend.services.QuestionService;
import com.regulus.examportalbackend.services.QuizService;
import com.regulus.examportalbackend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/exam-portal/question")
public class QuestionController {

    private final QuestionService questionService;

    private final QuizService quizService;

    private final UserService userService;

    private final JavaMailSender mailSender;

    public QuestionController(QuestionService questionService, QuizService quizService, UserService userService, JavaMailSender mailSender) {
        this.questionService = questionService;
        this.quizService = quizService;
        this.userService = userService;
        this.mailSender = mailSender;
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
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) throws MessagingException, UnsupportedEncodingException {
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
        String maxMarks = String.valueOf(questions.get(0).getQuiz().getMaxMarks());
        Map<String, Object> map = Map.of("marksGot", marksGot,"correctAnswer", correctAnswers, "attemptes", attemptes);
        String markGot = String.valueOf(marksGot);
        String correctAnswerr = String.valueOf(correctAnswers);

        return ResponseEntity.ok(map);


    }

    @PostMapping("/send-result")
    public ResponseEntity<?> sendResult(Long idUser, String marksGot,  String  correctAnswers, String maxMarks)throws MessagingException, UnsupportedEncodingException {

        User user = userService.getUser(idUser).get();
        String toAddress = user.getEmail();
        String fromAddress = "contact@examportal.com";
        String senderName = "Diang Edu";
        String subject = "Your Quiz Results";
        String content = "Dear [[name]],<br>"
                + "Your have complete th Quiz:<br>"
                + "With marks  [[marksGot]] /  [[maxMarks]]"
                + "You have   [[correctAnswers]] "
                + "Thank you,<br>"
                + "Diang EDU Team.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getUsername());
        content = content.replace("[[marksGot]]", marksGot);
        content = content.replace("[[maxMarks]]", maxMarks);
        content = content.replace("[[correctAnswers]]", correctAnswers);

        helper.setText(content, true);

        mailSender.send(message);

        System.out.println("Email has been sent");
        return ResponseEntity.ok("Email sent");
    }

}
