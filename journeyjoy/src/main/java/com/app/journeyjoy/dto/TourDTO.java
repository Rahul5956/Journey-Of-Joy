package com.app.journeyjoy.dto;

import java.time.LocalDate;

import com.app.journeyjoy.entities.Packages;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TourDTO {
	@JsonProperty(access = Access.READ_ONLY)
	public Long id;
	public Packages packages;
	public LocalDate startDate;
	public LocalDate endDate;
	public double price;
	public Long userId;

}
