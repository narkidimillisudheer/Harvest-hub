import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar from '../Navbar';
import Topbar from '../Topbar';
import { jwtDecode } from 'jwt-decode';
import {  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function CropCard({ crop ,addToCart}) {
  const [quantity, setQuantity] = useState(0); // State to manage quantity value

  // Function to handle incrementing quantity
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  // Function to handle decrementing quantity
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ cropName: crop.cropName, quantity,price:crop.price,productId:crop._id });
      alert('Item added successfully');
      setQuantity(0);
    }
  };
  return (
    <>
      <style>
        {`
        .crop-list {
          display: flex;
          justify-content: space-around; /* Space around the cards */
          flex-wrap: wrap; /* Allow cards to wrap to the next line */
        }

        .crop-card {
          background-color: green;
          color: white;
          border-radius: 8px;
          margin: 10px;
          padding: 10px;
          width: 30%; /* Adjust width as needed */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between; /* Space between image and details */
          transition: transform 0.3s;
        }

        .crop-card:hover {
          transform: translateY(-5px);
        }

        .crop-image img {
          width:  390px;/ Image occupies 90% of the width */
          height: 150px; /* Image occupies 70% of the height */
          border-radius: 25px;
          object-fit: cover;
          transition: transform 0.3s;
          padding:15px 10px 0px 10px;
        }

        .crop-details {
          
          text-align: center;
        }
        .cd12{
          display: flex;
          justify-content: space-between;
          align-items: normal;
          width: 100%;
          margin-top: 10px;
        }

        .shopping-basket-icon {
          font-size: 24px;
          cursor: pointer;
        }
        .quantity-buttons {
          display: flex;
          align-items: center;
        }

        .quantity-button {
          background-color: #ffffff;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          margin: 0 5px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          
        }
        .v111{
          display : flex;
          text-align : center;
          width:30px;
          border-radius : 15px;
        }
        .quantity-buttons{
          position:relative;
          left:70px;
        }
        .q1{
          position:relative;
          left:-60px;
        }
        #img3416{
          height:300px;
          width:300px;
          transition: transform 0.3s;
        }
        `}
      </style>
      <div className="crop-card">
        <div className="crop-image">
          {crop.imageBase64 && <img  id="img3416"src={`data:image/jpeg;base64,${crop.imageBase64}`} alt={crop.cropName} />}
        </div>
        <div className="crop-details">
          <h3>{crop.cropName}</h3>
          <div className="cd12">
          <div className="q1"><p>Quantity: {crop.quantity} KG</p></div>
          <br />
          <p>Price:₹{crop.price}</p>   
          <div className="quantity-buttons">
              <button className="quantity-button" onClick={handleDecrement}>-</button>
              <input type="text" className='v111' name="quan" value={quantity} readOnly />
              <button className="quantity-button" onClick={handleIncrement}>+</button>
              <span className="shopping-basket-icon" onClick={handleAddToCart}>
                <i className="fas fa-shopping-basket"></i>
              </span>
            </div></div>
        </div>
      </div>
    </>
  );
}

function UserHomePage() {
  const [crops, setCrops] = useState([]);
  
  useEffect(() => {
    // Fetch crop data from backend when component mounts
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3001/api/crops');
        setCrops(response.data);
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    }
    fetchData();
  }, []);
  const [cart, setCart] = useState([]); 
  const [showCart, setShowCart] = useState(false);
  const addToCart = (item) => {
    setCart([...cart, item]);  // Add item to cart
    console.log(cart);
  };
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userType = decodedToken.userType;
      setUserType(userType);
      if(userType==='customer'){
        setUsername(decodedToken.username);
      }
      
    }
  }, []);
  const CartPopup = () => {
    return (
      <>
      <style>
      {`
      .cart-popup {
        position: fixed;
        top: 130px;
        right: 0;
        height: 100%;
        width: 300px;
        background-color: white;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        overflow-y: auto;
        transition: transform 0.3s ease-in-out;
      }
      
      .show-cart {
        transform: translateX(0);
      }
      
      .hide-cart {
        transform: translateX(100%);
      }
      
      .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        border-bottom: 1px solid #ccc;
      }
      
      .cart-items {
        padding: 20px;
      }
      
      .cart-items ul {
        list-style: none;
        padding: 0;
      }
      
      .cart-items li {
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
      }
      
      .cart-items .item-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .cart-items button {
        background-color: #ff6347;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
      }
      
      .cart-items button:hover {
        background-color: #cc4736;
      }
      
      `}
      </style>
      <div className="cart-popup">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button class="btn btn-outline-secondary close-btn" onClick={() => setShowCart(false)}>Close</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  <div className="item-info">
                    <span>{item.cropName}</span>
                    <span>Quantity: {item.quantity}</span>
                    <span>Price: <b>₹</b>{item.price * item.quantity}</span>
                  </div>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
          <div className="total-price">
            Total: <b>₹</b>{calculateTotalPrice()}
          </div>
          <center><button onClick={submitCart}>Submit</button></center>
        </div>
      </div>
      </>
    );
  };
  const submitCart = async () => {
    try {
      // Make a POST request to your backend endpoint with the cart data
      const response = await axios.post('http://localhost:3001/api/submit-cart', { cart });
      console.log('Cart submitted successfully:', response.data);
      // alert("your items are successfully placed for order");
      Swal.fire({
        title: 'Congratulations!',
        text: 'Your order is successfullty placed',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // Clear the cart after submitting
      setCart([]);
    } catch (error) {
      console.error('Error submitting cart:', error);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear data in localStorage
    sessionStorage.removeItem('token');
    // localStorage.removeItem('username');
    
    // Redirect to appropriate page
    navigate('/login'); // Redirect to the login page
  };
  return (
    <>
    <Topbar />
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
      <h2 href="index.html" class="navbar-brand d-flex align-items-center px-4 px-lg-5">
            <h1 class="m-0">Harvest Hub</h1>
        </h2>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
        
        <h4>Welcome, {username}</h4>
        &emsp;
        <button  class="btn btn-primary" onClick={() => setShowCart(true)}>View Cart</button>&emsp;
        <button onClick={handleLogout} class="btn btn-danger">Logout</button>
        </div>
       
      </div>
    </nav>
    <div className="home-page">
    
       
      {showCart && <CartPopup />}
      
      <h2>Crops Available</h2>
      <div className="crop-list">
        {crops.map((crop) => (
          <CropCard key={crop._id} crop={crop} addToCart={addToCart} />
        ))}
      </div>
    </div>
    </>
    
  );
}

export default UserHomePage;
