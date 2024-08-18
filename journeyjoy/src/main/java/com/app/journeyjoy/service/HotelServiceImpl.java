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
import com.app.journeyjoy.dto.HotelDTO;
import com.app.journeyjoy.entities.Destination;
import com.app.journeyjoy.entities.Hotel;
import com.app.journeyjoy.repository.DestinationRepository;
import com.app.journeyjoy.repository.HotelRepository;

@Service
@Transactional
public class HotelServiceImpl implements HotelService {

	@Autowired
	public HotelRepository hotelRepository;
	@Autowired
	public ModelMapper modelMapper;
	@Autowired
	public DestinationRepository destinationRepository;

	
	@Override
	public List<HotelDTO> getallhotel() {
	    return hotelRepository.findAll().stream()
	        .map(hotel -> {
	            HotelDTO dto = modelMapper.map(hotel, HotelDTO.class);
	            dto.setDestination_id(hotel.getDestinations().getId()); // Set destination_id in DTO
	            return dto;
	        })
	        .collect(Collectors.toList());
	}


	@Override
	public ApiResponse addNewHotel(HotelDTO newhotel) {
		Destination Dest = destinationRepository.findById(newhotel.destination_id)
				.orElseThrow(() -> new ResourceNotFoundException("invalid destination_id"));

		Hotel hotel = modelMapper.map(newhotel, Hotel.class);

		hotel.setDestinations(Dest);

		hotelRepository.save(hotel);

		return new ApiResponse("New Tour added");
	}

	@Override
	public ApiResponse deleteHotel(Long id) {
		if (hotelRepository.existsById(id)) {
			// API of CrudRepo - public void deleteById(ID id)
			hotelRepository.deleteById(id);
			return new ApiResponse("Hotel deleted");
		}
		return new ApiResponse("Invalid Hotel ID");

	}

	@Override
	  public ApiResponse updateHotel(Long id, HotelDTO newDetails) {
		
	        Optional<Hotel> optionalDestination =  hotelRepository.findById(id);
	       
	        Hotel existingHotel = optionalDestination.get();
	        existingHotel.setName(newDetails.getName());
	        existingHotel.setAddress(newDetails.address);
	        existingHotel.setStarRating(newDetails.starRating);
	          
	            Destination Dest = destinationRepository.findById(newDetails.destination_id)
	    				.orElseThrow(() -> new ResourceNotFoundException("invalid Destination_id"));
	            existingHotel.setDestinations(Dest);
	            Hotel hotel = modelMapper.map(existingHotel, Hotel.class);
	    		hotel.setDestinations(Dest);
	    		
	    		hotelRepository.save(hotel);
	             return new ApiResponse("New Destination added");
	         
	    }
	 @Override
	    public HotelDTO getHotelById(Long id) {
	        Hotel hotel = hotelRepository.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Destination not found"));
	        return modelMapper.map(hotel, HotelDTO.class);
	    }

	@Override
	public List<HotelDTO> findHotelByDestinationId(Long destinationId) {
		
		return hotelRepository.findByDestinations(destinationId).stream().map(hotel->modelMapper.map(hotel, HotelDTO.class)).collect(Collectors.toList());
		
	}

}
