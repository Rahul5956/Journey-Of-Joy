import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../service/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const userRespDTO = { firstName, lastName, address, phoneno, dob, email, password };

    UserService.userRegistration(userRespDTO)
      .then((response) => {
        console.log('User registered successfully:', response.data);
        navigate('/signin'); // Redirect to SignIn page after successful registration
      })
      .catch((error) => {
        console.error('There was an error registering the user!', error);
        alert('Failed to register. Please check your details and try again.');
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <img
            alt="Your Company"
            src="https://img.icons8.com/?size=100&id=nMSSSpYre8pz&format=png&color=000000"
            className="mb-4"
            style={{ height: '40px' }}
          />
          <h2 className="h4 mb-3 font-weight-normal">Create your account</h2>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="form-control"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="form-control"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="form-control"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneno">Phone Number</label>
            <input
              type="text"
              id="phoneno"
              className="form-control"
              placeholder="Enter phone number"
              value={phoneno}
              onChange={(e) => setPhoneno(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              className="form-control"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mt-3">
            Sign Up
          </button>

          <div className="text-center mt-3">
            <Link to="/signin" className="text-decoration-none">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;