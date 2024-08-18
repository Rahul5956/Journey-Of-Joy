package com.app.journeyjoy.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.journeyjoy.custom_exceptions.ResourceNotFoundException;
import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.ReviewsDTO;
import com.app.journeyjoy.entities.Hotel;
import com.app.journeyjoy.entities.Review;
import com.app.journeyjoy.entities.Tour;
import com.app.journeyjoy.entities.User;
import com.app.journeyjoy.repository.HotelRepository;
import com.app.journeyjoy.repository.ReviewsRepository;
import com.app.journeyjoy.repository.TourRepository;
import com.app.journeyjoy.repository.UserRepository;

@Service
@Transactional

public class ReviewServiceImpl implements ReviewService {
	@Autowired
	private ReviewsRepository repositoryReviewsRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private HotelRepository hotelRepository;

	@Autowired
	private TourRepository tourRepository;

	@Override
	public List<ReviewsDTO> getallReview() {
		return repositoryReviewsRepository.findAll().stream().map(review -> modelMapper.map(review, ReviewsDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse addHotelReview(ReviewsDTO reviewDTO, Long hotelId) {

		User user = userRepository.findById(reviewDTO.getUsers())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid user_id"));

		Hotel hotel = hotelRepository.findById(hotelId)
				.orElseThrow(() -> new ResourceNotFoundException("Hotel id not found"));

		Review review = modelMapper.map(reviewDTO, Review.class);
		review.setUsers(user);
		review.setHotels(hotel);

		repositoryReviewsRepository.save(review);
		return new ApiResponse("Hotel review added successfully");
	}

	@Override
	public ApiResponse addTourReview(ReviewsDTO reviewDTO, Long tourId) {
		User user = userRepository.findById(reviewDTO.getUsers())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid user_id"));

		Tour tour = tourRepository.findById(tourId)
				.orElseThrow(() -> new ResourceNotFoundException("Tour id not found"));

		Review review = modelMapper.map(reviewDTO, Review.class);
		review.setUsers(user);
		review.setTours(tour);

		repositoryReviewsRepository.save(review);
		return new ApiResponse("Tour review added successfully");

	}

}
