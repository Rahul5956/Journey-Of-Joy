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
public class PaymentDTO {
	@JsonProperty(access = Access.READ_ONLY)
	public Long id;
	public double amount;
	public LocalDate paymentdate;
	public String paymentmethod;
	public PaymentStatus paymentstatus;
	@JsonProperty(access = Access.WRITE_ONLY)
	public Long booking_id;

}
