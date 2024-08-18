import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [amount, setAmount] = useState('');
  const [bookingId, setBookingId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('bookingId');
    if (id) {
      setBookingId(id);

      const storedTourData = JSON.parse(localStorage.getItem('tourData'));
      if (storedTourData) {
        setAmount(storedTourData.price);
      }
    } else {
      setError("Booking ID is missing.");
      navigate("/"); 
    }
  }, [navigate]);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const paymentDTO = {
        amount: parseFloat(amount),
        paymentmethod: paymentMethod,
        paymentdate: new Date().toISOString().split('T')[0],
        paymentstatus: 'COMPLETED', 
      };

      await UserService.makePayment(paymentDTO, bookingId);
      alert("Payment is completed");
      localStorage.removeItem('bookingId');
      navigate('/');
    } catch (error) {
      console.error("Error making payment:", error);
      if (error.response) {
        setError(`Server Error: ${error.response.data.message || 'Payment failed. Please try again.'}`);
      } else if (error.request) {
        setError('Network Error: Please check your connection.');
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Payment</h1>
      <form onSubmit={handlePayment}>
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
        <div className="form-group">
          <label htmlFor="paymentMethod">Payment Method</label>
          <select
            id="paymentMethod"
            className="form-control"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Google Pay">Google Pay</option>
            <option value="Apple Pay">Apple Pay</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Pay</button>
        {error && <p className="text-danger mt-3">{error}</p>}
      </form>
    </div>
  );
}

export default PaymentPage;
