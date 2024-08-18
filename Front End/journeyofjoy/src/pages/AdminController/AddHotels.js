import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminService from '../../service/AdminService';
import 'bootstrap/dist/css/bootstrap.min.css';


  const AddHotels = () => {
    const [name, setname] = useState('');
    const [address, setAddress] = useState('');
    const [starRating, setstarRating] = useState('');
    const [destination_id, setdestination_id] = useState('');
    
    const navigate = useNavigate();
  
    const handleAddHotel = (e) => {
      e.preventDefault();
      const HotelDTO = { name,  address, starRating, destination_id };
  
      AdminService.addNewhotel(HotelDTO)
        .then((response) => {
          console.log('Admin added Hotel successfully:', response.data);
          navigate('/admin/dashboard')
        })
        .catch((error) => {
            console.error('There was an error adding the hotel!', error);
            alert('Failed to add hotel. Please try again.');
          });
    };
  

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <img
            alt="Your Company"
            src="https://img.icons8.com/?size=100&id=nMSSSpYre8pz&format=png&color=000000"
            className="mb-4"
            style={{ height: '40px' }}
          />
          <h2 className="h4 mb-3 font-weight-normal">Add New Hotel</h2>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="name">Hotel Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter Hotel name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              className="form-control"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="starRating">starRating</label>
            <input
              type="text"
              id="starRating"
              name="starRating"
              className="form-control"
              placeholder="Enter starRating"
              value={starRating}
              onChange={(e) => setstarRating(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="destination_id">Destination ID</label>
            <input
              type="text"
              id="destination_id"
              name="destination_id"
              className="form-control"
              placeholder="Enter destination ID"
              value={destination_id}
              onChange={(e) => setdestination_id(e.target.value)}
              required
            />
          </div>
          
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary mt-3">
              Add
            </button>
            <button type="button" className="btn btn-secondary mt-3" onClick={() => navigate('/admin/dashboard/hotels')}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 export default AddHotels;