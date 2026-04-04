import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-page">
      <p className="notfound-code">404</p>
      <h1 className="notfound-title">Page not found</h1>
      <p className="notfound-sub">The page you're looking for doesn't exist.</p>
      <Link to="/" className="notfound-btn">Go Home</Link>
    </div>
  );
}

export default NotFound;
