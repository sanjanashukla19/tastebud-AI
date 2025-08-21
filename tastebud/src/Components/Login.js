import React from 'react';
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput,MDBCard,MDBCardBody } from 'mdb-react-ui-kit';
import background from '../images/tastebudbg.jpeg';
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import Background from "../Assets/blob.svg";

const Login=()=> {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [username, setUsername] = useState('');
const { updateUser } = useUser();

const navigate = useNavigate();

const handleLogin = async () => {
  const response = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (data.status === 'success') {
    // Set local storage key-value pairs
    localStorage.setItem('username', data.username);
    localStorage.setItem('name', data.name);
    localStorage.setItem('email', data.email);
    localStorage.setItem('user_id', data.userid);
    localStorage.setItem('isLoggedIn',true);
    setIsLoggedIn(true);
     navigate('/'); // Redirect to home page
  }
  else if (data.status === 'error' && data.message === 'Invalid email or password') {
    // Display a prompt for incorrect password
    alert('Incorrect password or email. Please try again.');
  }
};
  return (
    <MDBContainer className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', paddingTop: '50px' }}>
    <MDBCard style={{ maxWidth: '400px', boxShadow: '0px 0px 8px rgba(0.5, 0.5, 0.5, 0.5)'}}>
      <MDBCardBody>
        <h1 className="text-center mb-4" style={{ fontFamily: 'cursive', fontStyle: 'italic', fontWeight: 'bold', fontSize: '3rem', color: 'black' }}>Login</h1>
        <MDBInput className="mb-4" label='Email address' onChange={(e) => setEmail(e.target.value)} type='email' />
        <MDBInput className="mb-4" label='Password' onChange={(e) => setPassword(e.target.value)} type='password' />
        <div className="d-flex justify-content-between mb-4">
          <a href="!#" style={{ color: 'black', fontStyle: 'oblique' }}>Forgot password?</a>
        </div>
        <div className='text-center mt-4'>
          <MDBBtn className="px-5 me-2" size='sm' style={{ backgroundColor: '#FFA726', color: 'black', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' }} onClick={handleLogin}>Login</MDBBtn>
          <p className="small fw-bold mt-2 mb-2" style={{ color: 'black' }}>Don't have an account? <a style={{ color: 'red' }} href="Signup">Register</a></p>
        </div>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>
  );
}

export default Login;