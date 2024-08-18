package com.app.journeyjoy.service;

import java.util.List;

import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.PaymentDTO;

public interface PaymentService {
	List<PaymentDTO> getallpayment();
	ApiResponse paymentProcess(PaymentDTO paymentDTO,Long bookingid);
}
