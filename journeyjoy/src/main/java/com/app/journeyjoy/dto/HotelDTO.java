package com.app.journeyjoy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HotelDTO {
	@JsonProperty(access = Access.READ_ONLY)
	public Long id;
	public String name;
	public String address;
	public int starRating;
	public Long destination_id;
}
