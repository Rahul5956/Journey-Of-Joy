package com.app.journeyjoy.custom_exceptions;

public class ApiException extends RuntimeException{
	public ApiException(String mesg) {
		super(mesg);
	}
}
