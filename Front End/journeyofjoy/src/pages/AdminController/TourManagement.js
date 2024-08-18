import React, { useEffect, useState } from 'react';
import AdminService from '../../service/AdminService';
import { useNavigate } from 'react-router-dom'; 

function TourList() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = () => {
    AdminService.listAllTour()
      .then(response => {
        setTours(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the Tours!", error);
      });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Tours List</h2>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tour ID</th> {/* Added Tour ID column */}
            <th scope="col">Package</th>
            <th scope="col">Price</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">User ID</th>
          </tr>
        </thead>
        <tbody>
          {tours.length > 0 ? (
            tours.map((tour, index) => (
              <tr key={tour.id}>
                <th scope="row">{index + 1}</th>
                <td>{tour.id}</td> {/* Display Tour ID here */}
                <td>{tour.packages}</td>
                <td>{tour.price}</td>
                <td>{formatDate(tour.startDate)}</td>
                <td>{formatDate(tour.endDate)}</td>
                <td>{tour.userId}</td> {/* Display User ID here */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No Tours available</td> {/* Adjusted colspan */}
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/admin/dashboard')}>Back</button>  
      </div>
    </div>
  );
}

export default TourList;
