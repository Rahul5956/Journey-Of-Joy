import React, { useEffect, useState } from 'react';
import AdminService from '../../service/AdminService';
import { useNavigate } from 'react-router-dom';

function DestinationManagement() {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = () => {
    AdminService.listAllDestination()
      .then(response => {
        setDestinations(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the destinations!", error);
      });
  };

  const handleAddDestination = () => {
    navigate('/add-destination'); // Navigate to the add destination form page
  };

  const handleEditDestination = (destinationId) => {
    navigate(`/edit-destination/${destinationId}`); // Navigate to the edit destination form page
  };

  const handleDeleteDestination = (id) => {
    AdminService.deleteDestination(id)
      .then(() => {
        fetchDestinations(); // Refresh the destination list after deletion
      })
      .catch(error => {
        console.error("There was an error deleting the destination!", error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Destination Management</h2>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={handleAddDestination}>Add Destination</button>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope='col'>Destination ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Location</th>
            <th scope="col">Popularity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {destinations.length > 0 ? (
            destinations.map((destination, index) => (
              <tr key={destination.id}>
              <th scope="row">{index + 1}</th>  
                <td>{destination.id}</td>             
                <td>{destination.name}</td>
                <td>{destination.description}</td>
                <td>{destination.Location}</td> {/* Ensure the property name matches your backend */}
                <td>{destination.popularity}</td>
                <td>
                  <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEditDestination(destination.id)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteDestination(destination.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No Destinations available</td>
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

export default DestinationManagement;
