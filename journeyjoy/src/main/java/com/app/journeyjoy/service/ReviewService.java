package com.app.journeyjoy.service;

import java.util.List;

import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.ReviewsDTO;

public interface ReviewService {

	List<ReviewsDTO> getallReview();
	ApiResponse addHotelReview(ReviewsDTO reviewDTO,Long hotelId);
	
	ApiResponse addTourReview(ReviewsDTO reviewDTO, Long tourId);
}
