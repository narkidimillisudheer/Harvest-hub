// Topbar.js
import React from 'react';
import './bootstrap.min.css'
import './style2.css'

function Topbar() {
  return (
    <div className="container-fluid bg-dark text-light px-0 py-2">
      <div className="row gx-0 d-none d-lg-flex">
        <div className="col-lg-7 px-5 text-start">
          <div className="h-100 d-inline-flex align-items-center">
            <span class="far fa-envelope me-2"></span>
            <span>harvesthub@gmail.com</span>
          </div>
        </div>
        <div className="col-lg-5 px-5 text-end">
          <div className="h-100 d-inline-flex align-items-center mx-n2">
            <span>Follow Us:</span>
            <button className="btn btn-link text-light" href=""><i className="fab fa-facebook-f"></i></button>
            <button className="btn btn-link text-light" href=""><i className="fab fa-twitter"></i></button>
            <button className="btn btn-link text-light" href=""><i className="fab fa-linkedin-in"></i></button>
            <button className="btn btn-link text-light" href=""><i className="fab fa-instagram"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
