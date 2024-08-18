package com.app.journeyjoy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.journeyjoy.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking,Long> {

}
