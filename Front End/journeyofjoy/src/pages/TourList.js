import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import UserService from "../service/UserService";
import "bootstrap/dist/css/bootstrap.min.css";

function TourList() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [packageType, setPackageType] = useState('');
  const [hotels, setHotels] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate(); 

  const getPriceBasedOnPackage = (packageType) => {
    switch (packageType) {
      case 'ADVENTURE':
        return 150.0;
      case 'CULTURAL':
        return 180.0;
      case 'CRUISE':
        return 250.0;
      case 'FAMILY':
        return 120.0;
      case 'ROMANTIC':
        return 220.0;
      case 'LUXURY':
        return 300.0;
      default:
        return 0.0;
    }
  };

  const calculatePrice = (hotel) => {
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24);
    const basePriceForPackage = getPriceBasedOnPackage(packageType);
    const hotelPriceByRating = hotel.starRating * 50.0;
    return basePriceForPackage + hotelPriceByRating * days;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const destinationResponse = await UserService.searchDestination(location);
      const destinationId = destinationResponse.data[0].id; 
      const hotelResponse = await UserService.getHotelsByDestinationId(destinationId);
      setHotels(hotelResponse.data);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setSearchPerformed(false);
    }
  };

  const handleBookTour = async (hotel) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert("Please log in to book a tour.");
      return;
    }

    const tourData = {
      userId: userId,
      startDate: startDate,
      endDate: endDate,
      packages: packageType,
      hotelId: hotel.id,
      price: calculatePrice(hotel),
    };
    localStorage.setItem('tourData', JSON.stringify(tourData));
    
    try {
      
    await UserService.bookTour(tourData, hotel.id)
    .then((result)=>{
      console.log(result)
      const tour=result.data
      localStorage.setItem('tourId',tour.id)

    })
     
     
    navigate(`/payment`,{ state: { tourData } });
     
    } catch (error) {
      console.error("Error booking tour or creating booking:", error);
      alert("Failed to book the tour or create the booking.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Search for a Destination</h1>
      <form onSubmit={handleSearch} className="mb-5">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="location">Destination</label>
            <input
              type="text"
              className="form-control"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter a destination"
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="packageType">Package Type</label>
            <select
              id="packageType"
              className="form-control"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option value="ADVENTURE">Adventure</option>
              <option value="CULTURAL">Cultural</option>
              <option value="CRUISE">Cruise</option>
              <option value="FAMILY">Family</option>
              <option value="ROMANTIC">Romantic</option>
              <option value="LUXURY">Luxury</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Search
        </button>
      </form>

      {searchPerformed && (
        <div>
          <h2 className="text-center mb-4">Available Hotels</h2>
          <div className="row">
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <div className="col-md-4 mb-4" key={hotel.id}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{hotel.name}</h5>
                      <p className="card-text">Rating: {hotel.starRating}</p>
                      <p className="card-text">Total Price: ${calculatePrice(hotel).toFixed(2)}</p>
                      <button
                        className="btn btn-success mt-3"
                        onClick={() => handleBookTour(hotel)}
                      >
                        Book Tour
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-100">No hotels found for the selected criteria.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TourList;
