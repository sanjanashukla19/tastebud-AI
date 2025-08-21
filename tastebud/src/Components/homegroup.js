// HomeGroup.js

import React from 'react';
import Home_k from './Home_k';
import About from './About';
import Testimonial from './Testimonial';
import Contact from './Contact';
import Footer from './Footer';
import Navbar_k from "./Navbar_k"; 
import "../css/landingpage.css";
import Options from './Options';

const HomeGroup = () => {
  return (
    <div className="home-group-container">
    
      <Home_k />
      
      <About />
      <Options />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomeGroup;
