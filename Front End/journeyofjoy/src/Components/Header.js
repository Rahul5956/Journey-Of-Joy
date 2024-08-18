import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-light" style={{ backgroundColor: '#007bff' }}>
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            <h1 className="display-6">Journey Of Joy</h1>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
