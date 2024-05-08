import React,{useState} from 'react' 
import './Login.css'
import { useEffect } from 'react'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
const FarmerLogin = () => {
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const container = document.getElementById('container');

        const handleSignUpClick = () => {
            container.classList.add('right-panel-active');
        };

        const handleSignInClick = () => {
            container.classList.remove('right-panel-active');
        };

        signUpButton.addEventListener('click', handleSignUpClick);
        signInButton.addEventListener('click', handleSignInClick);

        return () => {
            signUpButton.removeEventListener('click', handleSignUpClick);
            signInButton.removeEventListener('click', handleSignInClick);
        };
    }, []);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        location: '',
        file: null
    });

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, file: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('file', formData.file);

            await axios.post('http://localhost:3001/farmerSignup', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Signup successful');
        } catch (error) {
            console.error('Error:', error.response.data);
            alert('Signup failed');
        }
    };
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
    // const handleLoginSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         console.log("hello1")
    //         const response = await axios.post('http://localhost:3001/farmerLogin', formLoginData
    //     )
    //     console.log(response)
    //         alert("succesful");

    //         setResponseData(response.data);
    //         console.log("hello2")
    //         if (response.status === 201) {
    //             setSuccessLoginMessage('login successful!');
    //             setErrorLoginMessage('');
    //             navigate('/home');
    //             // setResponseData(response.data);

    //         } 
    //         else if(response.status===401){
    //             alert("not verified");
    //             setErrorLoginMessage('user is not verified');
    //             setSuccessLoginMessage('');
                
    //         }
    //         else {
    //             setErrorLoginMessage('login failed. Please try again.');
    //             setSuccessLoginMessage('');
    //         }
    //         console.log(response.data);
    //         // Handle success response, e.g., store authentication token in localStorage
    //     } catch (error) {
    //         console.error('Error:', error.response.data);
    //         // setErrorMessage(error.response.data.message);
    //     }
 //   };
 const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3001/farmerLogin', formLoginData);
        if (response.status === 201) {
            setSuccessLoginMessage('Login successful!');
            setErrorLoginMessage('');
            await  sessionStorage.setItem('token', response.data.token);
            navigate('/farmerHome');
        } else {
            setErrorLoginMessage('Login failed. Please try again.');
            setSuccessLoginMessage('');
        }
    } catch (error) {
        console.error('Error:', error.response);
        if (error.response && error.response.status === 401) {
            setErrorLoginMessage(error.response.data.message);
        } else {
            setErrorLoginMessage('Error occurred during login. Please try again.');
        }
        setSuccessLoginMessage('');
    }
};

    return (
        <div class="d11">
        <div class="container11" id="container">
        <div class="form-container11 sign-up-container11">
                <h1 class="h12">Farmer Login</h1>
                {successLoginMessage && <div>{successLoginMessage}</div>}
                {errorLoginMessage && <div>{errorLoginMessage}</div>}
                {responseData && <div>{responseData.message}</div>}
                <form onSubmit={handleLoginSubmit}>
                
                <input type="email" name="email" placeholder="Email" value={formLoginData.email} onChange={handleLoginChange} required />
                <input type="password" name="password" placeholder="Password" value={formLoginData.password} onChange={handleLoginChange} required />
                <button type="submit" class="b12">Login</button>
            </form>
                <div>Forgot your password?<span id="click">Click here!</span></div>
        </div>
        <div class="form-container11 sign-in-container11">
                <h2 class="h12">Farmer SignUp</h2>
                <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <input type="file" name="file" onChange={handleChange} required /><br />
                <button type="submit" class="b12">Signup</button>
            </form>
        </div>
        <div class="overlay-container11">
            <div class="overlay11">
                <div class="overlay-panel11 overlay-left11">
                    <h1 class="h12">Sign Up</h1>
                    <p class="p11">If you dont have an account</p>
                    <button class="b12" id="signIn">SignUp</button>
                </div>
                <div class="overlay-panel11 overlay-right11">
                    <h1 class="h12"> Login</h1>
                    <p class="p11">If you have an account</p>
                    <button class="b12" id="signUp">Login</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default FarmerLogin