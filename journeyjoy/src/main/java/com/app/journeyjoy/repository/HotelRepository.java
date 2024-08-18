package com.app.journeyjoy.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.journeyjoy.entities.Hotel;



public interface HotelRepository extends JpaRepository<Hotel,Long> {
	@Query("select h from Hotel h where h.destinations.id=?1")
	List<Hotel> findByDestinations(Long destinationid); 
}
