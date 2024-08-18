package com.app.journeyjoy.service;

import java.util.List;

import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.HotelDTO;

public interface HotelService {
	List<HotelDTO> getallhotel();

	ApiResponse addNewHotel(HotelDTO hotel);

	ApiResponse deleteHotel(Long id);

	ApiResponse updateHotel(Long id,HotelDTO hotel);
	
	List<HotelDTO> findHotelByDestinationId(Long destinationId);

	HotelDTO getHotelById(Long id);
}
