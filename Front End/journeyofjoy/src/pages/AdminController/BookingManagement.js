import React, { useEffect, useState } from 'react';
import AdminService from '../../service/AdminService';
import { useNavigate } from 'react-router-dom';

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    AdminService.getallbooking()
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bookings!", error);
      });
  };

 

  

  
  return (
    <div className="container mt-4">
      <h2 className="text-center">Booking Management</h2>
      
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Booking ID</th>
            <th scope="col">Booking Date</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Tour ID</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <tr key={booking.id}>
                <th scope="row">{index + 1}</th>
                <td>{booking.id}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{booking.paymentStatus}</td>
                <td>{booking.tourId}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No Bookings available</td>
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

export default BookingManagement;
