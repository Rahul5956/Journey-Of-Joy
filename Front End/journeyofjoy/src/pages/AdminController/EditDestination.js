import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminService from '../../service/AdminService';

function EditDestination() {
  const { id } = useParams(); // Get the destination ID from the URL
  const [destination, setDestination] = useState({
    name: '',
    description: '',
    location: '',
    popularity: '',
    tour_id: '' // Ensure this field is included if needed
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the destination details when the component mounts
    AdminService.getDestinationByid(id)
      .then(response => {
        setDestination(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the destination!", error.response || error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDestination(prevDestination => ({
      ...prevDestination,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminService.updateDestination(id, destination)
      .then(() => {
        navigate('/admin/dashboard/destinations'); // Redirect after successful update
      })
      .catch(error => {
        console.error("There was an error updating the destination!", error.response || error);
        alert(`Failed to update destination: ${error.response ? error.response.data.message : error.message}`);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Edit Destination</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={destination.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={destination.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={destination.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="popularity">Popularity</label>
          <input
            type="number"
            className="form-control"
            id="popularity"
            name="popularity"
            value={destination.popularity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tour_id">Tour ID</label>
          <input
            type="text"
            className="form-control"
            id="tour_id"
            name="tour_id"
            value={destination.tour_id}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Destination</button>
        <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/admin/dashboard/destinations')}>
          Back to Destination
        </button>
      </div>
      </form>
    </div>
  );
}

export default EditDestination;
