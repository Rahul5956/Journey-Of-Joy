package com.app.journeyjoy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.journeyjoy.entities.Tour;

public interface TourRepository extends JpaRepository<Tour,Long> {

}
