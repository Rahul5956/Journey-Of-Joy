import React, { useEffect, useState } from 'react';
import AdminService from '../../service/AdminService';
import { useNavigate } from 'react-router-dom';

function HotelManagement() {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = () => {
    AdminService.listAllHotels()
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the hotels!", error);
      });
  };

  const handleAddHotel = () => {
    navigate('/AddHotels'); // Navigate to the add hotel form page
  };

  const handleEditHotel = (hotelId) => {
    navigate(`/edit-hotel/${hotelId}`); // Navigate to the edit hotel form page
  };

  const handleDeleteHotel = (id) => {
    AdminService.deleteHotelDetails(id)
      .then(() => {
        fetchHotels(); // Refresh the hotel list after deletion
      })
      .catch(error => {
        console.error("There was an error deleting the hotel!", error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Hotel Management</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleAddHotel}>Add Hotel</button>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Star Rating</th>
            <th scope="col">Destination ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length > 0 ? (
            hotels.map((hotel, index) => (
              <tr key={hotel.id}>
                <th scope="row">{index + 1}</th>
                <td>{hotel.name}</td>
                <td>{hotel.address}</td>
                <td>{hotel.starRating}</td>
                <td>{hotel.destination_id}</td>
                <td>
             <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditHotel(hotel.id)}>Edit</button>
             <button className="btn btn-danger btn-sm" onClick={() => handleDeleteHotel(hotel.id)}>Delete</button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No Hotels available</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end mb-3">
      <button type="button" className="btn btn-secondary mt-3" onClick={() => navigate('/admin/dashboard')}>
              Back
            </button>
      </div>
    </div>
  );
}

export default HotelManagement;
