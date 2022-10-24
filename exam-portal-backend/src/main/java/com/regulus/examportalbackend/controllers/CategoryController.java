package com.regulus.examportalbackend.controllers;

import com.regulus.examportalbackend.models.Category;
import com.regulus.examportalbackend.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/exam-portal/category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/")
    public ResponseEntity<?> addCategory(@RequestBody Category category){
        Category category1 = this.categoryService.addCategory(category);
        return ResponseEntity.ok(category1);
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable("id") long id){
        return this.categoryService.getCategory(id);
    }

    @GetMapping("/")
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable("id") long id, @RequestBody Category category){
        return this.categoryService.updateCategory(category, id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable("id") long id){
        this.categoryService.deleteCategory(id);
    }
}
