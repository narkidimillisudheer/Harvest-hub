// Footer.js
import React from 'react';
import './bootstrap.min.css'
import './footer.css'

function Footer() {
  return (
    <div className="container-fluid bg-dark text-light footer mt-5 py-5 wow fadeIn" data-wow-delay="0.1s">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-4">Our Office</h4>
            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Vishnu Institute Of Technology, Bhimavaram</p>
            <p className="mb-2"><i className="fa fa-envelope me-3"></i>harvesthub@gmail.com</p>
            <div className="d-flex pt-2">
              <button className="btn btn-square btn-outline-light rounded-circle me-2" href=""><i className="fab fa-twitter"></i></button>
              <button className="btn btn-square btn-outline-light rounded-circle me-2" href=""><i className="fab fa-facebook-f"></i></button>
              <button className="btn btn-square btn-outline-light rounded-circle me-2" href=""><i className="fab fa-youtube"></i></button>
              <button className="btn btn-square btn-outline-light rounded-circle me-2" href=""><i className="fab fa-linkedin-in"></i></button>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-4">Services</h4>
            <button className="btn btn-link" href="">Direct Farmer to Customer Connection</button>
            <button className="btn btn-link" href="">Live Weather Prediction</button>
            <button className="btn btn-link" href="">Crop Disease Prediction</button>
            <button className="btn btn-link" href="">Freshly Produced Crops</button>
            {/* <button className="btn btn-link" href="">Green Technology</button> */}
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-4">Quick Links</h4>
            <button className="btn btn-link" href="">About Us</button>
            <button className="btn btn-link" href="">Contact Us</button>
            <button className="btn btn-link" href="">Our Services</button>
            <button className="btn btn-link" href="">Terms & Condition</button>
            <button className="btn btn-link" href="">Support</button>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-4">Newsletter</h4>
            <p>Register now and start organic farming</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
