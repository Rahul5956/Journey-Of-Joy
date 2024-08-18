import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container-fluid text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Journey Of Joy. All rights reserved.
        </p>
        <p className="mb-0">
          <Link to="/about" className="text-white text-decoration-none">
            About Us
          </Link> | 
          <Link to="/contact" className="text-white text-decoration-none ms-2">
            Contact
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
