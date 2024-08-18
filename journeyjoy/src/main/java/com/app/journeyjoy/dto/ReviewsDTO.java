package com.app.journeyjoy.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewsDTO {
	@JsonProperty(access = Access.WRITE_ONLY)
	public Long users;
	public String comment;
	public int rating;
	
}
