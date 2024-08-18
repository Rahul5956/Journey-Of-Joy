import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignInForm() {
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');  // New state for error messages

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    setFormDetails({
      ...formDetails,
      [name]: event.target.value
    });
  };

  const signInUser = () => {
    if (formDetails.email === '' || formDetails.password === '') {
      alert('Please fill all the details');
      return;
    }

    UserService.userSignIn(formDetails)
      .then((result) => {
        console.log('User signed in successfully:', result);

        const user = result.data;
        if (user && user.id) {
          localStorage.setItem('userId', user.id);
          console.log('User role:', user.role);
          if (user.role === 'ROLE_CUSTOMER') {
            navigate('/TourList');
          } else if (user.role === 'ROLE_ADMIN') {
            navigate('/Admin/dashboard');
          } else {
            alert('Unknown role. Please contact support.');
          }
        } else {
          alert('Failed to retrieve user information.');
        }
      })
      .catch((error) => {
        console.error('There was an error signing in!', error);
        // Set the error message based on the response
        setErrorMessage(error.response?.data?.message || 'Failed to sign in. Please check your credentials and try again.');
      });
  };

  const handleForgotPassword = () => {
    navigate('/reset-password');
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
          <h2 className="h4 mb-3 font-weight-normal">Sign in to your account</h2>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={formDetails.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formDetails.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="button" className="btn btn-primary btn-block mt-3" onClick={signInUser}>
            Sign In
          </button>

          {errorMessage && (
            <div className="text-danger mt-3">
              {errorMessage}
            </div>
          )}

          <div className="text-center mt-3">
            <p>
              Don't have an account?{' '}
              <a href="/signup" className="text-decoration-none">
                Sign up
              </a>
            </p>
            <p>
              <a href="#!" onClick={handleForgotPassword} className="text-decoration-none">
                Forgot Password?
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
