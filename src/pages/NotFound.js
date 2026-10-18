import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <section className="notfound-page" aria-labelledby="notfound-title">
      <p className="notfound-code" aria-hidden="true">404</p>
      <h1 className="notfound-title" id="notfound-title">Page not found</h1>
      <p className="notfound-sub">The page you’re looking for doesn’t exist or may have moved.</p>
      <Link to="/" className="notfound-btn">Back to Browse</Link>
    </section>
  );
}

export default NotFound;
