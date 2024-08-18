package com.app.journeyjoy.service;

import java.util.List;

import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.TourDTO;
import com.app.journeyjoy.dto.TourRespDTO;

public interface TourService {
	List<TourDTO> getallTour();

	ApiResponse deleteTour(Long id);

	TourRespDTO createTour(TourDTO tourdto,Long hotelId);
	
	
}
