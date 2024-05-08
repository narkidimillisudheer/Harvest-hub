// About.js
import React from 'react';
import './bootstrap.min.css'
import './style2.css'
import about1 from '../assets/about.jpg'

function About() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-end">
          <div className="col-lg-3 col-md-5 wow fadeInUp" data-wow-delay="0.1s">
            <img className="img-fluid rounded" data-wow-delay="0.1s" src="https://images.pexels.com/photos/10782850/pexels-photo-10782850.jpeg?auto=compress&cs=tinysrgb&w=600 " alt="About" />
          </div>
          <div className="col-lg-6 col-md-7 wow fadeInUp" data-wow-delay="0.3s">
            <h4 className="display-2 text-primary mb-0">Farm-fresh goodness, delivered to your doorstep</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
