import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHotel, FaMapMarkedAlt, FaMoneyBillWave, FaSuitcaseRolling, FaCommentDots, FaBookOpen } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div>
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <nav className="nav flex-column align-items-center">
          <button className="nav-link btn custom-btn mb-2" onClick={() => navigate('tours')}>
            <FaSuitcaseRolling className="me-2" /> Manage Tours
          </button>
          <button className="nav-link btn custom-btn mb-2" onClick={() => navigate('destinations')}>
            <FaMapMarkedAlt className="me-2" /> Manage Destinations
          </button>
          <button className="nav-link btn custom-btn mb-2" onClick={() => navigate('hotels')}>
            <FaHotel className="me-2" /> Manage Hotels
          </button>
          <button className="nav-link btn custom-btn mb-2" onClick={() => navigate('bookings')}>
            <FaBookOpen className="me-2" /> Manage Bookings
          </button>
          <button className="nav-link btn custom-btn mb-2" onClick={() => navigate('reviews')}>
            <FaCommentDots className="me-2" /> Manage Reviews
          </button>
          <button className="nav-link btn custom-btn mb-2" onClick={() => navigate('payments')}>
            <FaMoneyBillWave className="me-2" /> Manage Payments
          </button>
        </nav>
      </div>
    </div>
  );
}

export default AdminDashboard;
