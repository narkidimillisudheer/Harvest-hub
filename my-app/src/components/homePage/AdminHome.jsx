import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
const CardComponent = ({ data, fetchData }) => {
  const [verified, setVerified] = useState(data.isVerified);

  const handleView = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/file/${data._id}`, {
        responseType: 'blob',
      });
      const fileUrl = window.URL.createObjectURL(response.data);
      window.open(fileUrl);
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  const handleVerify = async () => {
    try {
      await axios.put(`http://localhost:3001/api/verify/${data._id}`);
      setVerified(true);
      fetchData(); // Call parent function to refresh data after verification
    } catch (error) {
      console.error('Error verifying:', error);
    }
  };

  return (
    <><style>
      {`
     
      .card-container523 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 20px;
        
      }
      .card763 {
        height:250px;
        width: 250px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 20px;
        box-sizing: border-box;
        
      }
      .card-body879 {
        padding: 20px;
        height: 200px;
        display: flex;
        flex-direction: column;
        width:250px;
      }
      .card-buttons {
        margin-top: auto;
          display: flex;
          justify-content: space-between;
      }
      
      .card7918{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 20px;
      }
      `}
    </style>
    <div>
      <div className="card-container523">
      <div className="card763">
        <div className="card-body879">
          <h5 className="card-title">{data.email}</h5>
          <p className="card-text">{data.username}</p>
          <p className="card-text">{data.location}</p>
          <button className="btn btn-primary" onClick={handleView}>
            View
          </button><br />
          {!verified && (
            <button className="btn btn-success" onClick={handleVerify}>
              Verify
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

const AdminHome = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/farmersdata');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div className='card7918'>
      {data.map(item => (
        <CardComponent key={item._id} data={item} fetchData={fetchData} />
      ))}
    </div>
    </>
  );
};

export default AdminHome;
