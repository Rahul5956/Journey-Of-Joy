import React, { useState } from 'react';
import AdminService from '../../service/AdminService';
import { useNavigate } from 'react-router-dom';

function AddDestination() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [popularity, setPopularity] = useState('');
  const [tour_id, settour_id]=useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDestination = {
      name,
      description,
      location,
      popularity,
      tour_id,
    };

    AdminService.addNewDestination(newDestination)
      .then(response => {
        console.log('Destination added successfully!', response.data);
        navigate('/admin/dashboard/destinations'); // Navigate back to the destination management page
      })
      .catch(error => {
        console.error('There was an error adding the destination!', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Add Destination</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea 
            className="form-control" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input 
            type="text" 
            className="form-control" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Popularity</label>
          <input 
            type="number" 
            className="form-control" 
            value={popularity} 
            onChange={(e) => setPopularity(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>tour_id</label>
          <input 
            type="number" 
            className="form-control" 
            value={tour_id} 
            onChange={(e) => settour_id(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Destination</button>
        <button 
          type="button" 
          className="btn btn-secondary mt-3 ml-3" 
          onClick={() => navigate('/destination-management')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddDestination;
