package com.app.journeyjoy.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.journeyjoy.custom_exceptions.ResourceNotFoundException;
import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.TourDTO;
import com.app.journeyjoy.dto.TourRespDTO;
import com.app.journeyjoy.entities.Hotel;
import com.app.journeyjoy.entities.Packages;
import com.app.journeyjoy.entities.Tour;
import com.app.journeyjoy.entities.User;
import com.app.journeyjoy.repository.HotelRepository;
import com.app.journeyjoy.repository.TourRepository;
import com.app.journeyjoy.repository.UserRepository;

@Service
@Transactional
public class TourServiceImpl implements TourService {
	@Autowired
	private TourRepository tourRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private HotelRepository hotelRepository;

	@Override
	
		public List<TourDTO> getallTour() {
		    return tourRepository.findAll().stream()
		        .map(tour -> {
		            TourDTO dto = modelMapper.map(tour, TourDTO.class);
		            dto.setUserId(tour.getUsers().getId()); // Set user_id in the DTO
		            return dto;
		        })
		        .collect(Collectors.toList());
	}



	@Override
	public ApiResponse deleteTour(Long id) {
		if (tourRepository.existsById(id)) {
			tourRepository.deleteById(id);
			return new ApiResponse("Tour is deleted");
		}
		return new ApiResponse("Tour id is not valid");
	}

	@Override
	public TourRespDTO createTour(TourDTO tourdto,Long hotelId) {
		
		if(tourdto.getEndDate().isBefore(tourdto.getStartDate())) {
			throw new IllegalArgumentException("End date cannot be before start date.");
		}
		User u = userRepository.findById(tourdto.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("invalid user_id"));
		
		Hotel hotel=hotelRepository.findById(hotelId).orElseThrow(()->new ResourceNotFoundException("Hotel id not found"));
		
		double price = calculatePrice(tourdto.getPackages(), hotel.getStarRating(), tourdto.getStartDate(), tourdto.getEndDate());
		Tour tour = modelMapper.map(tourdto, Tour.class);
		tour.setPrice(price);
		tour.setUsers(u);
		
		Tour tours=tourRepository.save(tour);
	    
	    
	   
		return modelMapper.map(tours, TourRespDTO.class);
	}
	
	private double calculatePrice(Packages packageType, int hotelStarRating, LocalDate startDate, LocalDate endDate) {
	    long days = java.time.temporal.ChronoUnit.DAYS.between(startDate, endDate);
	    double basePriceForPackage = getPriceBasedOnPackage(packageType);
	    double hotelPriceByRating = hotelStarRating * 50.0;
	    return basePriceForPackage + hotelPriceByRating * days;
	}

	private double getPriceBasedOnPackage(Packages packageType) {
	    switch (packageType) {
	        case ADVENTURE:
	            return 150.0;
	        case CULTURAL:
	            return 180.0;
	        case CRUISE:
	            return 250.0;
	        case FAMILY:
	            return 120.0;
	        case ROMANTIC:
	            return 220.0;
	        case LUXURY:
	            return 300.0;
	        default:
	            return 0.0;
	    }
	}
	
	


}
