import React, { useEffect, useState } from 'react';
import AdminService from '../../service/AdminService';
import { useNavigate, useParams } from 'react-router-dom';

function EditHotel() {
  const { id } = useParams(); // Get the hotel ID from the URL parameters
  const [hotel, setHotel] = useState({
    name: '',
    address: '',
    starRating: '',
    destination_id: ''
  });
  const [destinations, setDestinations] = useState([]); // To store destination options
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotelDetails();
    fetchDestinations(); // Fetch destinations for the dropdown
  }, []);

  const fetchHotelDetails = () => {
    AdminService.getHotelByid(id)
      .then(response => {
        setHotel(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the hotel details!", error);
      });
  };

  const fetchDestinations = () => {
    AdminService.listAllHotels()
      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching destinations!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel(prevHotel => ({
      ...prevHotel,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.updateHotelDetails(id, hotel)
      .then(() => {
        navigate('/admin/dashboard/hotels'); // Navigate back to hotel list
      })
      .catch(error => {
        console.error("There was an error updating the hotel!", error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Hotel</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={hotel.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={hotel.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="starRating" className="form-label">Star Rating</label>
          <input
            type="number"
            className="form-control"
            id="starRating"
            name="starRating"
            value={hotel.starRating}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
        <label htmlFor="destination_id" className="form-label">Destination ID</label>
        <input
        type='number'
          id="destination_id"
          name="destination_id"
          className="form-select"
          value={hotel.destination_id}
          onChange={handleChange}
          required
        />
          
      </div>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/admin/dashboard/hotels')}>
          Back to Hotels
        </button>
      </div>
    </div>
  );
}

export default EditHotel;
