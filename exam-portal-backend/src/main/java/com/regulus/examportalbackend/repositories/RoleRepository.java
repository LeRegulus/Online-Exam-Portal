package com.regulus.examportalbackend.repositories;

import com.regulus.examportalbackend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role, String> {
}
