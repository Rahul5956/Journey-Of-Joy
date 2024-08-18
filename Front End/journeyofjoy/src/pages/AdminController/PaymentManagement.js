import React, { useEffect, useState } from 'react';
import AdminService from '../../service/AdminService';
import { useNavigate } from 'react-router-dom';

function PaymentManagement() {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    AdminService.getallPayments()
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the payments!", error);
      });
  };

 
  

  return (
    <div className="container mt-4">
      <h2 className="text-center">Payment Management</h2>
      
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Payment ID</th>
            <th scope="col">Amount</th>
            <th scope="col">Payment Date</th>
            <th scope="col">Payment Method</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Booking ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <tr key={payment.id}>
                <th scope="row">{index + 1}</th>
                <td>{payment.id}</td>
                <td>{payment.amount}</td>
                <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.paymentStatus}</td>
                <td>{payment.bookingId}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No Payments available</td>
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

export default PaymentManagement;
