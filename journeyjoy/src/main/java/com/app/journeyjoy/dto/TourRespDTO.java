package com.app.journeyjoy.dto;

import java.time.LocalDate;

import com.app.journeyjoy.entities.Packages;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class TourRespDTO {
	@JsonProperty(access = Access.READ_ONLY)
	public Long id;
	public Packages packages;
	public LocalDate startDate;
	public LocalDate endDate;
	public double price;
	@JsonProperty(access = Access.WRITE_ONLY)
	public Long userId;
	@JsonProperty(access = Access.WRITE_ONLY)
	public Long hotelId;
}
