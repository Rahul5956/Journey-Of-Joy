package com.app.journeyjoy.dto;
//fname,lname , adddress,phonenumber,

import java.time.LocalDate;

import com.app.journeyjoy.entities.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class UserRespDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Long id;

	private String firstName;
	private String lastName;
	private String address;
	private String phoneno;
	private LocalDate dob;
	private String email;
	private String password;
	private Role role;
}
