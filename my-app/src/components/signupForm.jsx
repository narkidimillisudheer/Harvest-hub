import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/signup', formData);
            console.log(response.data);
            // Handle success, e.g., show a success message or redirect
        } catch (error) {
            console.error('Error:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <div>
            <h1>Signup Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required /><br />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
