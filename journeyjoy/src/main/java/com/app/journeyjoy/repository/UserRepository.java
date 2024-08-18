package com.app.journeyjoy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.journeyjoy.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmailAndPassword(String em,String pass);

	
	boolean existsByEmail(String email);

	Optional<User> findByEmail(String email);
}
