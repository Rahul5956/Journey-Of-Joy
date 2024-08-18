package com.app.journeyjoy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DestinationDTO {
	@JsonProperty(access = Access.READ_ONLY)
	public Long id;
	public String name;
	public String Location;
	public String description;
	public int popularity;
	@JsonProperty(access = Access.WRITE_ONLY)
	public Long tour_id;

}
