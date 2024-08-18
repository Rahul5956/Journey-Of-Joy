package com.app.journeyjoy.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.journeyjoy.custom_exceptions.ResourceNotFoundException;
import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.PaymentDTO;
import com.app.journeyjoy.entities.Booking;
import com.app.journeyjoy.entities.Payment;
import com.app.journeyjoy.repository.BookingRepository;
import com.app.journeyjoy.repository.PaymentRepository;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private BookingRepository bookingRepository;
	
	@Override
	public List<PaymentDTO> getallpayment() {
		return paymentRepository.findAll()
				.stream()
				.map(payment->
				modelMapper.map(payment, PaymentDTO.class))
				.collect(Collectors.toList());
	}

	@Override
	public ApiResponse paymentProcess(PaymentDTO paymentDTO,Long bookingid) {
		Booking booking=bookingRepository.findById(bookingid).orElseThrow(()->new ResourceNotFoundException("booking id is not found!!!"));
		Payment payment=modelMapper.map(paymentDTO, Payment.class);
		payment.setBookings(booking);
		paymentRepository.save(payment);
		return new ApiResponse("payment has been completed");
	}

}
