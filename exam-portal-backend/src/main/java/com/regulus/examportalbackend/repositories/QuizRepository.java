package com.regulus.examportalbackend.repositories;

import com.regulus.examportalbackend.models.Category;
import com.regulus.examportalbackend.models.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCategory(Category category);

    List<Quiz> findByActive(Boolean b);

    List<Quiz> findByCategoryAndActive(Category category, Boolean b);

}
