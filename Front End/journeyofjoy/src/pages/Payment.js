import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function Payment() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const tourData = JSON.parse(localStorage.getItem('tourData'));
  const tourId = JSON.parse(localStorage.getItem('tourId'));

   console.log(tourId)


  useEffect(() => {
    if (tourData) {
      setAmount(tourData.price);
    } else {
      setError("No tour data found.");
      navigate("/"); 
    }
  }, [tourData, navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();


    try {
   
      const bookingData = {
        BookingDate: new Date().toISOString().split('T')[0],
        paymentStatus: "PENDING",
      
        tourId:parseInt(tourId), 
      };
      console.log(bookingData)
     await UserService.makeBooking(bookingData)
     .then((result)=>{
      console.log(result)
      const bookingId=result.data.id
      localStorage.setItem('bookingId',bookingId)
     })
 
      navigate('/makePayment');

    } catch (error) {
      console.error("Error making booking:", error);
      if (error.response) {
       
      
       
        setError(`Server Error: ${error.response.data.message || 'Booking failed. Please try again.'}`);
      } else if (error.request) {
      
        setError('Network Error: Please check your connection.');
      } else {
      
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Booking</h1>
      <form onSubmit={handleBooking}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={amount}
            readOnly
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Booking</button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
}

export default Payment;
