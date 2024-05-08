import React , {useState} from 'react'
import './Adlogin.css'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'

const AdminLogin = () => {
  const [formLoginData, setFormLoginData] = useState({
    email: '',
    password: ''
});

const handleLoginChange = (e) => {
    setFormLoginData({
        ...formLoginData,
        [e.target.name]: e.target.value
    });
};
const [successLoginMessage, setSuccessLoginMessage] = useState('');
const [errorLoginMessage, setErrorLoginMessage] = useState('');
const [responseData, setResponseData] = useState(null);
const navigate = useNavigate();
const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/adminLogin', formLoginData);
      if (response.status === 201) {
          setSuccessLoginMessage('login successful!');
          setErrorLoginMessage('');
          await  sessionStorage.setItem('token', response.data.token);
          navigate('/adminweb');
          // setResponseData(response.data);

      } else {
          setErrorLoginMessage('login failed. Please try again.');
          setSuccessLoginMessage('');
      }
      console.log(response.data);
      // Handle success response, e.g., store authentication token in localStorage
  } catch (error) {
      console.error('Error:', error.response.data);
      setErrorLoginMessage(error.response.data.message);
  }
  };
    return(
      <div id="body123">
      <center>
        <div className="c11">
          <center>
        <div class="c12">
        {successLoginMessage && <div>{successLoginMessage}</div>}
                {errorLoginMessage && <div>{errorLoginMessage}</div>}
                {responseData && <div>{responseData.message}</div>} 
        <h2 class="h123">ADMIN LOGIN</h2>
      </div><br />
      <div class="input_fields">
        <form onSubmit={handleLoginSubmit}>
          <div class="input1">
            <span class="s1"><img class="img1" src="https://cdn-icons-png.flaticon.com/128/747/747376.png" alt="image1"></img></span>
            <input type="email" name="email" placeholder="email" id="in1" value={formLoginData.email} onChange={handleLoginChange}/>
        </div>
        <div class="input2">
            <input type="password" name="password" placeholder="Password" value={formLoginData.password} onChange={handleLoginChange} id="in2"/>
            <span class="s1"><img class="img1" src="https://cdn-icons-png.flaticon.com/128/8300/8300875.png" alt="image2"></img></span>
        </div>
          <button class="b123" type="submit">LOGIN</button>
        </form>
        
      </div></center>
        </div></center>
        </div>
    );
}
export default AdminLogin 


