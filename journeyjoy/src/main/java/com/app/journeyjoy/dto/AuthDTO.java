package com.app.journeyjoy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class AuthDTO {
	private String email;
	private String password;
}
