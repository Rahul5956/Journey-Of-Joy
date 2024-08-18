package com.app.journeyjoy.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.journeyjoy.custom_exceptions.ResourceNotFoundException;
import com.app.journeyjoy.dto.ApiResponse;
import com.app.journeyjoy.dto.DestinationDTO;
import com.app.journeyjoy.entities.Destination;
import com.app.journeyjoy.entities.Tour;
import com.app.journeyjoy.repository.DestinationRepository;
import com.app.journeyjoy.repository.TourRepository;

@Service
@Transactional
public class DestinationServiceImpl implements DestinationService {

	@Autowired
	public DestinationRepository destinationRepository;
	@Autowired
	public ModelMapper modelMapper;
	@Autowired
	private TourRepository tourRepository;

	@Override
	public List<DestinationDTO> getallDestination() {
		return destinationRepository.findAll().stream()
				.map(destination -> modelMapper.map(destination, DestinationDTO.class)).collect(Collectors.toList());
	}

	@Override
	public ApiResponse addNewDestination(DestinationDTO newDestination) {
		Tour tour = tourRepository.findById(newDestination.tour_id)
				.orElseThrow(() -> new ResourceNotFoundException("invalid Tour_id"));

		Destination Dest = modelMapper.map(newDestination, Destination.class);

		Dest.setTours(tour);

		destinationRepository.save(Dest);

		return new ApiResponse("New Destination added");
	}

	@Override
	public ApiResponse deleteDestination(Long id) {
		if (destinationRepository.existsById(id)) {
		
			destinationRepository.deleteById(id);
			return new ApiResponse("Destination is deleted");
		}
		return new ApiResponse("Destination id is not valid");

	}
	
	 @Override
	    public DestinationDTO getDestinationById(Long id) {
	        Destination destination = destinationRepository.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));
	        return modelMapper.map(destination, DestinationDTO.class);
	    }
	@Override
	  public ApiResponse updateDestination(Long id, DestinationDTO newDetails) {
		
	        Optional<Destination> optionalDestination =  destinationRepository.findById(id);
	       
	        Destination existingDestination = optionalDestination.get();
	            existingDestination.setName(newDetails.getName());
	            existingDestination.setDescription(newDetails.getDescription());
	            existingDestination.setLocation(newDetails.getLocation());
	            existingDestination.setPopularity(newDetails.popularity);
	          
	            Tour tour = tourRepository.findById(newDetails.tour_id)
	    				.orElseThrow(() -> new ResourceNotFoundException("invalid Tour_id"));
	            existingDestination.setTours(tour);
	            Destination Dest = modelMapper.map(existingDestination, Destination.class);

	    		Dest.setTours(tour);
	             destinationRepository.save(Dest);
	             return new ApiResponse("New Destination added");
	         
	    }

	@Override
	public List<Destination> searchDestination(String location) {
		return destinationRepository.findByName(location);
	}

}
