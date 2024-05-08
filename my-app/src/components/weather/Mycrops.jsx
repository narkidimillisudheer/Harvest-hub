import React, { useState,useEffect} from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

const CardComponent = ({ data }) => {

  return (
    <><style>
      {`
     
      .card-container523 {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 20px;
        justify-content: flex-start;
        
      }
      .card763 {
        height:200px;
        width: 280px;
        border: 1px solid #ccc;
        border-radius: 30px;
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
          <h4 className="card-title">Name:{data.cropName}</h4>
          <h5 className="card-text">Quantity:{data.quantity}KG</h5>
          <p className="card-text">Price per kg:{data.price}<b>₹</b></p>
        </div>
      </div>
      </div>
    </div>
    </>
  );
};

const Mycrops = () => {
    const [data, setData] = useState([]);
    const [id, setId] = useState("");
  
    useEffect(() => {
      const fetchId = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const decodedToken = jwtDecode(token);
          const id = decodedToken.id;
          console.log(id);
          setId(id);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/mycrops/${id}`);
          console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchId();
      fetchData();
    }, [id]);

  return (
    <>
    <div className='card7918'>
      {data.map(item => (
        <CardComponent key={item._id} data={item} />
      ))}
    </div>
    </>
  );
};

export default Mycrops
