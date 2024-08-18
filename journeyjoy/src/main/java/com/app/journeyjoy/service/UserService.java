package com.app.journeyjoy.service;

import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.AuthDTO;
import com.app.journeyjoy.dto.UserRespDTO;

public interface UserService {
	UserRespDTO  authenticateUser(AuthDTO dto);
	ApiResponse addNewUser(UserRespDTO userdto);
	ApiResponse resetPassword(String email, String newPassword);
}
