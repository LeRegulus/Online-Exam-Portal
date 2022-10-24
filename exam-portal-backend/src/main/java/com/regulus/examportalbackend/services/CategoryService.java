package com.regulus.examportalbackend.services;

import com.regulus.examportalbackend.models.Category;
import com.regulus.examportalbackend.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category addCategory(Category category){
        return this.categoryRepository.save(category);
    }
    public Category updateCategory(Category category, long id){
        Category category1 = categoryRepository.findById(id).get();
        category1.setTitle(category.getTitle());
        category1.setDescription(category.getDescription());
        return this.categoryRepository.save(category1);
    }
    public List<Category> getCategories(){
        return this.categoryRepository.findAll();
    }
    public Category getCategory(Long id){
        return this.categoryRepository.findById(id).get();
    }
    public void deleteCategory(Long id){
        this.categoryRepository.deleteById(id);
    }
}
