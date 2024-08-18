package com.app.journeyjoy.service;

import java.util.List;

import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.DestinationDTO;
import com.app.journeyjoy.entities.Destination;


public interface DestinationService {

	List<DestinationDTO> getallDestination();

	ApiResponse addNewDestination(DestinationDTO newDestination);

	ApiResponse deleteDestination(Long id);

	ApiResponse updateDestination(Long id, DestinationDTO newDetails);
	
	List<Destination> searchDestination(String location);
	 
	DestinationDTO getDestinationById(Long id);
	
}
