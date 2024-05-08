// TopFeature.js
import React from 'react';
import './bootstrap.min.css'
import {Link} from 'react-router-dom';
import './style2.css'

function TopFeature() {
  const mystyle={
    color:'white',
    backgroundColor:'green',
    height:'60px',
    width:'200px',
    fontSize:'120%',



  }
  return (
    <div className="container-fluid top-feature py-5 pt-lg-0">
      <div className="container py-5 pt-lg-0">
        <div className="row gx-0">
          <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
            <div className="bg-white shadow d-flex align-items-center h-100 px-5" style={{ minHeight: '180px' }}>
              <div className="d-flex">
                <div className="ps-3">
                  {/* <span><h3>Customer Signup</h3></span> <br /> */}
                 <button style={mystyle}><Link to='/farmerLogin' style={mystyle} role='button'>For Farmers</Link></button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
            <div className="bg-white shadow d-flex align-items-center h-100 px-5" style={{ minHeight: '180px' }}>
              <div className="d-flex">
                <div className="ps-3">
                 {/* <span><h3>Farmer SignUp</h3></span> <br /> */}
                 <button style={mystyle}><Link to='/login' style={mystyle}   role='button'>For Customers</Link></button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
            <div className="bg-white shadow d-flex align-items-center h-100 px-5" style={{ minHeight: '180px' }}>
              <div className="d-flex">
                <div className="ps-3">
                  {/* <span><h3>Admin SignUp</h3></span><br /> */}
                 <button style={mystyle}> <Link to='/adminlogin' style={mystyle} role='button'>For Admin</Link></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopFeature;
