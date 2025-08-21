import React from 'react';
import {MDBContainer,MDBBtn, MDBInput, MDBCardBody,MDBCard} from 'mdb-react-ui-kit';
import Background from "../Assets/blob.svg";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordRulesVisible, setPasswordRulesVisible] = useState(false);

  const navigate = useNavigate();


  const handleSignup = async () => {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, username }),
    });
  
    const data = await response.json();
    if (data.status === 'success') {
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);
      localStorage.setItem('name', data.name);
      localStorage.setItem('isLoggedIn',true);
      setIsLoggedIn(true);
      setUsername(data.username);
      navigate('/');// Redirect to home page
    } else if (data.status === 'error') {
      // Display alert with error message
      alert(data.message);
    }
  };
  
  const handleEmailInputChange = (value) => {
    setEmail(value);
  };

  const handleNameInputChange = (value) => {
    setName(value);
  };

  const handleUsernameInputChange = (value) => {
    setUsername(value);
  };

  const handlePasswordInputFocus = () => {
    setPasswordRulesVisible(true);
  };

  const handlePasswordInputBlur = () => {
    setPasswordRulesVisible(false);
  };

  const validatePassword = (password) => {
    // Define regular expressions for each rule
    const minLengthRegex = /.{8,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    // Check each rule
    const isMinLength = minLengthRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);

    // Return true if all rules pass, false otherwise
    return isMinLength && hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValid = validatePassword(newPassword);
    console.log('Password is valid:', isValid);
  };

  return (
    <>
     <MDBContainer className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', paddingTop: '50px' }}>
     <MDBCard style={{ maxWidth: '400px', boxShadow: '0px 0px 8px rgba(0.5, 0.5, 0.5, 0.5)'}}>
          <MDBCardBody>
  <h1 className="text-center mb-4" style={{ fontFamily: 'cursive', fontStyle: 'italic', fontWeight: 'bold', fontSize: '3rem', color: 'black' }}>SignUp</h1>
  <MDBInput wrapperClass='mb-4' label={<span>Email address <span style={{color: 'red'}}>*</span></span>} id='formControlLg' type='email' value={email} onChange={(e) => handleEmailInputChange(e.target.value)} size="lg" />
  {email && !/^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email) && <p className="text-danger">Please enter a valid email address.</p>}
  <MDBInput
    wrapperClass='mb-4'
    label={<span>Password <span style={{color: 'red'}}>*</span></span>}
    id='formControlLg'
    type='password'
    value={password}
    onFocus={handlePasswordInputFocus}
    onBlur={handlePasswordInputBlur}
    onChange={handlePasswordChange}
    size="lg"
  />
  {passwordRulesVisible && (
    <div className="password-rules" style={{ color: 'black' }}>
      <h6>Password must contain:</h6>
      <ul>
        <li>At least 8 characters</li>
        <li>At least one uppercase letter</li>
        <li>At least one lowercase letter</li>
        <li>At least one digit</li>
        <li>At least one special character</li>
      </ul>
    </div>
  )}
  <MDBInput wrapperClass='mb-4' label={<span>Name <span style={{color: 'red'}}>*</span></span>} id='formControlLg' type='text' value={name} onChange={(e) => handleNameInputChange(e.target.value)} size="lg" />
  {name && !/^[^0-9].*$/.test(name) && <p className="text-danger">Name should not start with a number.</p>}
  <MDBInput wrapperClass='mb-4' label={<span>Username <span style={{color: 'red'}}>*</span></span>} id='formControlLg' type='text' value={username} onChange={(e) => handleUsernameInputChange(e.target.value)} size="lg" />
  {username && !/^[^0-9].*$/.test(username) && <p className="text-danger">Username should not start with a number.</p>}
  <div className='text-center mt-4'>
    <MDBBtn className="px-5 me-2" size='sm' style={{ backgroundColor: '#FFA726', color: 'black', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)' }} onClick={handleSignup}>
    SignUp</MDBBtn>
    <p className="small fw-bold mt-2 mb-2" style={{color:'black'}}>Do you have an account? <a style={{color:'red'}} href="Login" >Login</a></p>
  </div>
</MDBCardBody>

    </MDBCard>
    </MDBContainer>
   </>
  );
}

export default Signup;