package com.app.journeyjoy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.journeyjoy.entities.Destination;

public interface DestinationRepository extends JpaRepository<Destination,Long> {
	List<Destination> findByName(String name);
}
