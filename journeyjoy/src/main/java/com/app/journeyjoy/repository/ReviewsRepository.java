package com.app.journeyjoy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.journeyjoy.entities.Review;

public interface ReviewsRepository extends JpaRepository<Review, Long> {

}
