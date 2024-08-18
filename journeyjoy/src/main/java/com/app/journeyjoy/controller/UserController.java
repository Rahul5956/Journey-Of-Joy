package com.app.journeyjoy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.AuthDTO;
import com.app.journeyjoy.dto.BookingDTO;
import com.app.journeyjoy.dto.BookingRespDTO;
import com.app.journeyjoy.dto.PaymentDTO;
import com.app.journeyjoy.dto.ReviewsDTO;
import com.app.journeyjoy.dto.TourDTO;
import com.app.journeyjoy.dto.UserRespDTO;
import com.app.journeyjoy.entities.Destination;
import com.app.journeyjoy.service.BookingService;
import com.app.journeyjoy.service.DestinationService;
import com.app.journeyjoy.service.HotelService;
import com.app.journeyjoy.service.PaymentService;
import com.app.journeyjoy.service.ReviewService;
import com.app.journeyjoy.service.TourService;
import com.app.journeyjoy.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private TourService tourService;

	@Autowired
	private DestinationService destinationService;

	@Autowired
	private HotelService hotelService;
	
	@Autowired
	private ReviewService reviewService;
	
	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private PaymentService paymentService;
	
	
	
	
	    
	@PostMapping("/signin")
	public ResponseEntity<?> userSignIn(@RequestBody AuthDTO dto) {
		try {
			UserRespDTO respDto = userService.authenticateUser(dto);
			return ResponseEntity.ok(respDto);

		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/userRegistration")
	public ResponseEntity<?> userRegistration(@RequestBody UserRespDTO udto) {
		try {
			ApiResponse registeruser = userService.addNewUser(udto);
			return ResponseEntity.status(HttpStatus.CREATED).body(registeruser);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/createtour")
	public ResponseEntity<?> bookTour(@RequestBody TourDTO tourdto, @RequestParam Long hotelId) {
		try {
			if (hotelId == null) {
	            throw new IllegalArgumentException("Hotel ID must not be null.");
	        }
			return ResponseEntity.status(HttpStatus.CREATED).body(tourService.createTour(tourdto, hotelId));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@GetMapping("/searchDestination")
	public ResponseEntity<?> searchDestination(@RequestParam String Location) {
		try {
			List<Destination> destination = destinationService.searchDestination(Location);
			return ResponseEntity.ok(destination);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/addTourReview")
	public ResponseEntity<?> addTourReview(@RequestBody ReviewsDTO reviewDTO, @RequestParam Long tourId) {
		try {
			ApiResponse response = reviewService.addTourReview(reviewDTO, tourId);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}

	@PostMapping("/makeBooking")
	public ResponseEntity<?> makeBooking(@RequestBody BookingDTO bookingDTO) {
		try {
			
			BookingRespDTO response = bookingService.createBooking(bookingDTO);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@GetMapping("/gethotels")
	public ResponseEntity<?> getHotelBydestinationid(@RequestParam Long destinationid) {
		try {
			 
			return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.findHotelByDestinationId(destinationid));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@PostMapping("/makePayment")
	public ResponseEntity<?> makePayment(@RequestBody PaymentDTO paymentDTO,@RequestParam Long bookingId) {
		try {
			ApiResponse response = paymentService.paymentProcess(paymentDTO,bookingId);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
		}
	}
	@PostMapping("/resetPassword")
	public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String newPassword) {
	    try {
	        ApiResponse response = userService.resetPassword(email, newPassword);
	        return ResponseEntity.status(HttpStatus.OK).body(response);
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(e.getMessage()));
	    }
	}


	

}
