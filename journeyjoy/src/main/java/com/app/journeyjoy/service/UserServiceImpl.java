package com.app.journeyjoy.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.journeyjoy.custom_exceptions.InvalidCredentialsException;
import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.AuthDTO;
import com.app.journeyjoy.dto.UserRespDTO;
import com.app.journeyjoy.entities.Role;
import com.app.journeyjoy.entities.User;
import com.app.journeyjoy.repository.UserRepository;
@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
		
	@Autowired
	private ModelMapper mapper;
	
	  

	@Override
	public UserRespDTO authenticateUser(AuthDTO dto) {
		User user=userRepository.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
				.orElseThrow(()->new InvalidCredentialsException("Invalid email or password !!1"));
		
		return mapper.map(user, UserRespDTO.class);
	}


	@Override
	public ApiResponse addNewUser(UserRespDTO userdto) {


		User user=mapper.map(userdto, User.class);
		if (user.getRole() == null) {
	        user.setRole(Role.ROLE_CUSTOMER); 
	    }
		userRepository.save(user);
		return new ApiResponse("New User is Added");
	}


	@Override
	public ApiResponse resetPassword(String email, String newPassword) {
		
		 User user = userRepository.findByEmail(email)
		            .orElseThrow(() -> new InvalidCredentialsException("User with this email not found!"));
		    
		    user.setPassword(newPassword);
		    userRepository.save(user);
		    
		    return new ApiResponse("Password reset successfully!");
	}

}
