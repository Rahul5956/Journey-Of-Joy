package com.app.journeyjoy.custom_exceptions;

public class InvalidCredentialsException extends RuntimeException{
	public InvalidCredentialsException(String mesg) {
		super(mesg);
	}
}
