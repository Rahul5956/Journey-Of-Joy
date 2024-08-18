package com.app.journeyjoy.service;

import java.util.List;

import com.app.journeyjoy.dto.BookingDTO;
import com.app.journeyjoy.dto.BookingRespDTO;


public interface BookingService {

	List<BookingDTO> getallbooking();
	BookingRespDTO createBooking(BookingDTO bookingDTO);
	
}
