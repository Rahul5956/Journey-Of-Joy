import React, { useEffect, useState } from 'react';
import AdminService from '../../service/AdminService';
import { useNavigate } from 'react-router-dom';

function ReviewManagement() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = () => {
    AdminService.getallReviews()
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the reviews!", error);
      });
  };

  

  const handleDeleteReview = (id) => {
    AdminService.deleteReview(id)
      .then(() => {
        fetchReviews(); // Refresh the review list after deletion
      })
      .catch(error => {
        console.error("There was an error deleting the review!", error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Review Management</h2>
      
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Review ID</th>
            <th scope="col">Review Date</th>
            <th scope="col">Comment</th>
            <th scope="col">Rating</th>
            <th scope="col">Hotel ID</th>
            <th scope="col">Tour ID</th>
            <th scope="col">User ID</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <tr key={review.id}>
                <th scope="row">{index + 1}</th>
                <td>{review.id}</td>
                <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                <td>{review.comment}</td>
                <td>{review.rating}</td>
                <td>{review.hotelId}</td>
                <td>{review.tourId}</td>
                <td>{review.userId}</td>
                <td>
                   <button className="btn btn-danger btn-sm" onClick={() => handleDeleteReview(review.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No Reviews available</td>
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

export default ReviewManagement;
