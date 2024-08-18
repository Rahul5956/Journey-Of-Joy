import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
  
    localStorage.removeItem('userId');
    localStorage.removeItem('bookingId'); 
    localStorage.removeItem('tourData');
    localStorage.removeItem('tourId');

  
    navigate('/signin');
  }, [navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h2>Logging out...</h2>
      </div>
    </div>
  );
}
