package com.app.journeyjoy.dto;

import java.time.LocalDate;

import com.app.journeyjoy.entities.PaymentStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BookingDTO {
	@JsonProperty(access =Access.READ_ONLY)
    private Long id;
	
    private LocalDate bookingDate;
    private PaymentStatus paymentStatus;
    @JsonProperty(access = Access.READ_WRITE)
    private Long tourId;

	



}
