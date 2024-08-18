import React, { useEffect, useState } from 'react';
import AdminService from '../../service/AdminService';

function HotelList() {
  const [hotels, setHotels] = useState([]);

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

  const deleteHotel = (id) => {
    AdminService.deleteHotelDetails(id)
      .then(response => {
        console.log('Hotel deleted successfully:', response);
        fetchHotels(); // Refresh the hotel list after deletion
      })
      .catch(error => {
        console.error('There was an error deleting the hotel!', error);
        alert('Failed to delete the hotel. Please try again.');
      });
  };

  return (
    <div className="container mt-4">
    <h2 className="text-center">Hotel List</h2>
    <table className="table table-bordered table-striped">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Hotel Name</th>
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
                <button 
                  className="btn btn-danger" 
                  onClick={() => deleteHotel(hotel.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center">No hotels available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
}

export default HotelList;
