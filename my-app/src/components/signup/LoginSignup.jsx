import React from 'react' 
import './LoginSignup.css'
import { useEffect,useState } from 'react';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';

const LoginSignup = () => {
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
        location:''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const [responseData, setResponseData] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/signup', formData);
            if (response.status === 201) {
                setSuccessMessage('Signup successful!');
                setErrorMessage('');
                // setResponseData(response.data);

            } else {
                setErrorMessage('Signup failed. Please try again.');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Signup failed. Please try again.');
            setSuccessMessage('');
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
    const navigate = useNavigate();
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', formLoginData);
            if (response.status === 201) {
                setSuccessLoginMessage('login successful!');
                setErrorLoginMessage('');
               await  sessionStorage.setItem('token', response.data.token);
                navigate('/userHomePage');
                // setResponseData(response.data);

            } else {
                setErrorLoginMessage('login failed. Please try again.');
                setSuccessLoginMessage('');
            }
            console.log(response.data);
            // Handle success response, e.g., store authentication token in localStorage
        } catch (error) {
            console.error('Error:', error.response.data);
            setErrorMessage(error.response.data.message);
        }
    };
    return (
        <div className="d11">
        <div class="container11" id="container">
        <div class="form-container11 sign-up-container11">
                <h1 class="h11">Login</h1> 
                {successLoginMessage && <div>{successLoginMessage}</div>}
                {errorLoginMessage && <div>{errorLoginMessage}</div>}
                <form onSubmit={handleLoginSubmit}>
                <input type="email" name="email" placeholder="Email" value={formLoginData.email} onChange={handleLoginChange} required />
                <input type="password" name="password" placeholder="Password" value={formLoginData.password} onChange={handleLoginChange} required />
                <button type="submit" class="button11">Login</button>
            </form>
                <div>Forgot your password?<span id="click">Click here!</span></div>

                <button style={{ marginTop: '9px' }} class="button11">Login</button>
        </div>
        <div class="form-container11 sign-in-container11">
                <h1 class='h11'>SignUp</h1>
                {successMessage && <div>{successMessage}</div>}
                {errorMessage && <div>{errorMessage}</div>}
                {/* {responseData && <div>{responseData.message}</div>} */}
                <form onSubmit={handleSignupSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Enter location" value={formData.location} onChange={handleChange} required />
                <button type="submit" class="button11">Sign Up</button>
            </form>

        </div>
        <div class="overlay-container11">
            <div class="overlay11">
                <div class="overlay-panel11 overlay-left11">
                    <h1 class='h11'>Sign Up</h1>
                    <p class="p11">If you dont have an account</p>
                    <button class="ghost mt-51 button11" id="signIn">SignUp</button>
                </div>
                <div class="overlay-panel11 overlay-right11">
                    <h1 class='h11'> Login</h1>
                    <p class="p11">If you have an account</p>
                    <button class="ghost11 button11" id="signUp">Login</button>
                </div>
            </div>
        </div>
    </div>
    </div>
    );
}

export default LoginSignup